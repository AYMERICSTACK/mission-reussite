"use client";

import { useEffect, useState } from "react";
import type { AchievementResult } from "@/lib/achievements/achievements";
import { ConfettiLite } from "@/components/effects/ConfettiLite";
import { playSound } from "@/lib/audio/audio-engine";

export function AchievementToast({ childSlug, unlocked }: { childSlug: string; unlocked: AchievementResult[] }) {
  const [queue, setQueue] = useState<AchievementResult[]>([]);
  const current = queue[0];

  useEffect(() => {
    const key = `mission-reussite:achievements:${childSlug}`;
    const known = new Set<string>();
    const storedValue = window.localStorage.getItem(key);
    try {
      const parsed = JSON.parse(storedValue ?? "[]") as unknown;
      if (Array.isArray(parsed)) parsed.forEach((id) => typeof id === "string" && known.add(id));
    } catch {}

    const newlyUnlocked = unlocked.filter((achievement) => !known.has(achievement.id));
    window.localStorage.setItem(key, JSON.stringify(unlocked.map((achievement) => achievement.id)));

    // Lors de la toute première visite, on mémorise l’existant sans afficher une rafale de fenêtres.
    const hasExistingMemory = storedValue !== null;
    if (hasExistingMemory && newlyUnlocked.length) setQueue(newlyUnlocked.slice(0, 3));
  }, [childSlug, unlocked]);

  useEffect(() => {
    if (!current) return;
    playSound("badge");
    const timer = window.setTimeout(() => setQueue((items) => items.slice(1)), 5200);
    return () => window.clearTimeout(timer);
  }, [current]);

  if (!current) return null;

  return <div className="achievement-toast" role="status" aria-live="polite">
    <ConfettiLite active />
    <button type="button" aria-label="Fermer" onClick={() => setQueue((items) => items.slice(1))}>×</button>
    <span className="achievement-toast__symbol">{current.symbol}</span>
    <div>
      <small>🏆 Nouveau succès débloqué</small>
      <strong>{current.name}</strong>
      <p>{current.description}</p>
    </div>
  </div>;
}
