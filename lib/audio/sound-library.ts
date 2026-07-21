export type SoundEffect = "click" | "correct" | "error" | "chest" | "badge" | "levelUp" | "xp" | "character" | "transition";

type ToneStep = { frequency: number; duration: number; gain: number; type?: OscillatorType; delay?: number };

export const SOUND_LIBRARY: Record<SoundEffect, ToneStep[]> = {
  click: [{ frequency: 520, duration: 0.045, gain: 0.025, type: "sine" }],
  correct: [{ frequency: 523, duration: 0.09, gain: 0.06 }, { frequency: 659, duration: 0.11, gain: 0.055, delay: 0.07 }, { frequency: 784, duration: 0.14, gain: 0.05, delay: 0.15 }],
  error: [{ frequency: 230, duration: 0.08, gain: 0.035, type: "triangle" }, { frequency: 195, duration: 0.1, gain: 0.025, type: "triangle", delay: 0.06 }],
  chest: [{ frequency: 330, duration: 0.08, gain: 0.05 }, { frequency: 494, duration: 0.1, gain: 0.05, delay: 0.08 }, { frequency: 740, duration: 0.2, gain: 0.045, delay: 0.17 }],
  badge: [{ frequency: 660, duration: 0.12, gain: 0.05 }, { frequency: 880, duration: 0.18, gain: 0.045, delay: 0.09 }],
  levelUp: [{ frequency: 392, duration: 0.1, gain: 0.05 }, { frequency: 523, duration: 0.1, gain: 0.05, delay: 0.08 }, { frequency: 659, duration: 0.1, gain: 0.05, delay: 0.16 }, { frequency: 1047, duration: 0.24, gain: 0.04, delay: 0.24 }],
  xp: [{ frequency: 880, duration: 0.07, gain: 0.035 }, { frequency: 1175, duration: 0.12, gain: 0.03, delay: 0.06 }],
  character: [{ frequency: 440, duration: 0.09, gain: 0.025, type: "sine" }, { frequency: 554, duration: 0.12, gain: 0.02, delay: 0.08 }],
  transition: [{ frequency: 294, duration: 0.16, gain: 0.025, type: "sine" }, { frequency: 440, duration: 0.2, gain: 0.02, delay: 0.1 }],
};
