import { AMBIENCES, type AmbienceId } from "./ambience";
import { loadAudioPreferences } from "./settings";
import { SOUND_LIBRARY, type SoundEffect } from "./sound-library";

let context: AudioContext | null = null;
let ambienceNodes: { gain: GainNode; oscillators: OscillatorNode[]; id: AmbienceId } | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

export function playSound(effect: SoundEffect) {
  const preferences = loadAudioPreferences();
  if (!preferences.effects) return;
  const audio = getContext();
  if (!audio) return;
  const now = audio.currentTime;
  SOUND_LIBRARY[effect].forEach((step) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const start = now + (step.delay ?? 0);
    oscillator.type = step.type ?? "sine";
    oscillator.frequency.setValueAtTime(step.frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(step.gain, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + step.duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + step.duration + 0.03);
  });
}

export function setAmbience(id: AmbienceId) {
  const preferences = loadAudioPreferences();
  const audio = getContext();
  if (!audio || !preferences.music) return;
  if (ambienceNodes?.id === id) return;
  const profile = AMBIENCES[id];
  const now = audio.currentTime;
  if (ambienceNodes) {
    ambienceNodes.gain.gain.cancelScheduledValues(now);
    ambienceNodes.gain.gain.setValueAtTime(Math.max(ambienceNodes.gain.gain.value, 0.0001), now);
    ambienceNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.fadeMs / 1000);
    const old = ambienceNodes;
    window.setTimeout(() => old.oscillators.forEach((oscillator) => oscillator.stop()), profile.fadeMs + 80);
  }
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(profile.volume, now + profile.fadeMs / 1000);
  gain.connect(audio.destination);
  const oscillators = [profile.baseFrequency, profile.secondaryFrequency].map((frequency, index) => {
    const oscillator = audio.createOscillator();
    oscillator.type = profile.wave;
    oscillator.frequency.value = frequency;
    const localGain = audio.createGain();
    localGain.gain.value = index === 0 ? 0.8 : 0.28;
    oscillator.connect(localGain).connect(gain);
    oscillator.start();
    return oscillator;
  });
  ambienceNodes = { gain, oscillators, id };
}

export function stopAmbience(fadeMs = 500) {
  if (!ambienceNodes || !context) return;
  const active = ambienceNodes;
  ambienceNodes = null;
  const now = context.currentTime;
  active.gain.gain.cancelScheduledValues(now);
  active.gain.gain.setValueAtTime(Math.max(active.gain.gain.value, 0.0001), now);
  active.gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeMs / 1000);
  if (typeof window !== "undefined") window.setTimeout(() => active.oscillators.forEach((oscillator) => oscillator.stop()), fadeMs + 80);
}

export function refreshAudioPreferences() {
  const preferences = loadAudioPreferences();
  if (!preferences.music) stopAmbience(250);
}

export function gentleVibration(pattern: number | number[] = 18) {
  const preferences = loadAudioPreferences();
  if (preferences.economyMode || typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  navigator.vibrate(pattern);
}
