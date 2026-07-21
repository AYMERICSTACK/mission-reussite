import type { SoundEffect } from "./sound-library";

const prepared = new Set<SoundEffect>();

export function preloadSounds(effects: SoundEffect[]) {
  effects.forEach((effect) => prepared.add(effect));
  return prepared.size;
}

export function isSoundPrepared(effect: SoundEffect) {
  return prepared.has(effect);
}
