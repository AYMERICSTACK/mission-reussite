export type AudioPreferences = {
  music: boolean;
  effects: boolean;
  animations: boolean;
  economyMode: boolean;
  respectReducedMotion: boolean;
};

export const AUDIO_SETTINGS_KEY = "mission-reussite:audio-preferences:v1";

export const defaultAudioPreferences: AudioPreferences = {
  music: true,
  effects: true,
  animations: true,
  economyMode: false,
  respectReducedMotion: true,
};

export function loadAudioPreferences(): AudioPreferences {
  if (typeof window === "undefined") return defaultAudioPreferences;
  try {
    const stored = window.localStorage.getItem(AUDIO_SETTINGS_KEY);
    return stored ? { ...defaultAudioPreferences, ...JSON.parse(stored) } : defaultAudioPreferences;
  } catch {
    return defaultAudioPreferences;
  }
}

export function saveAudioPreferences(preferences: AudioPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent("mission-reussite:audio-settings", { detail: preferences }));
}

export function shouldReduceMotion(preferences = loadAudioPreferences()) {
  if (!preferences.animations || preferences.economyMode) return true;
  return preferences.respectReducedMotion && typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
