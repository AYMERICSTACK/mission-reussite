"use client";

import { loadAudioPreferences, shouldReduceMotion } from "@/lib/audio/settings";

export function ConfettiLite({ active }: { active: boolean }) {
  if (!active || typeof window === "undefined") return null;
  const preferences = loadAudioPreferences();
  if (preferences.economyMode || shouldReduceMotion(preferences)) return null;
  return <span className="fx-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--fx-i": index } as React.CSSProperties} />)}</span>;
}
