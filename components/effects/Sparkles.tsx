"use client";

import { shouldReduceMotion } from "@/lib/audio/settings";

export function Sparkles({ count = 12, className = "" }: { count?: number; className?: string }) {
  if (typeof window !== "undefined" && shouldReduceMotion()) return null;
  return (
    <span className={`fx-sparkles ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => <i key={index} style={{ "--fx-i": index } as React.CSSProperties}>✦</i>)}
    </span>
  );
}
