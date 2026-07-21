"use client";

export function FloatingXP({ xp, active }: { xp: number; active: boolean }) {
  if (!active) return null;
  return <span className="fx-floating-xp" aria-live="polite">+{xp} XP</span>;
}
