"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { playSound, refreshAudioPreferences } from "@/lib/audio/audio-engine";
import { loadAudioPreferences, shouldReduceMotion } from "@/lib/audio/settings";

export function AudioExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, [role='button']")) playSound("click");
    };
    const refresh = () => refreshAudioPreferences();
    document.addEventListener("click", click, { capture: true });
    window.addEventListener("mission-reussite:audio-settings", refresh);
    return () => {
      document.removeEventListener("click", click, { capture: true });
      window.removeEventListener("mission-reussite:audio-settings", refresh);
    };
  }, []);

  useEffect(() => {
    const preferences = loadAudioPreferences();
    if (shouldReduceMotion(preferences)) return;
    document.body.classList.remove("mission-route-enter");
    const frame = window.requestAnimationFrame(() => document.body.classList.add("mission-route-enter"));
    const timer = window.setTimeout(() => document.body.classList.remove("mission-route-enter"), 520);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.body.classList.remove("mission-route-enter");
    };
  }, [pathname]);

  return null;
}
