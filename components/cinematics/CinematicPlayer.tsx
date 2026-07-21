"use client";

import { useEffect, useState } from "react";
import type { CinematicScene } from "@/lib/cinematics/cinematics";
import { CharacterPortrait } from "@/components/illustrations/CharacterPortrait";
import { Sparkles } from "@/components/effects/Sparkles";
import { playSound, setAmbience, stopAmbience } from "@/lib/audio/audio-engine";

export function CinematicPlayer({ childSlug, scene }: { childSlug: string; scene?: CinematicScene }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(Boolean(scene));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!scene) return;
    let active = true;
    setLoading(true);
    fetch(`/api/cinematics?child=${encodeURIComponent(childSlug)}`)
      .then((response) => response.ok ? response.json() : { seenCinematicIds: [] })
      .then((payload: { seenCinematicIds?: string[] }) => {
        if (active) setVisible(!payload.seenCinematicIds?.includes(scene.id));
      })
      .catch(() => { if (active) setVisible(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [childSlug, scene]);

  useEffect(() => {
    if (!visible || !scene) return;
    setAmbience(scene.theme === "boss" || scene.theme === "eclipse" ? "space" : "forest");
    return () => stopAmbience(400);
  }, [visible, scene]);

  if (!scene) return null;

  function markSeen() {
    void fetch("/api/cinematics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ childSlug, cinematicId: scene!.id }) });
  }

  function close() {
    markSeen();
    setVisible(false);
    setIndex(0);
    stopAmbience(350);
  }

  function next() {
    playSound("character");
    if (index >= scene!.dialogues.length - 1) close();
    else setIndex((value) => value + 1);
  }

  const dialogue = scene.dialogues[index];
  const portrait = { Oscar: "oscar", Nova: "nova", Orion: "milo", Lyra: "sia", Kael: "nox", Narrateur: "nova" }[dialogue?.speaker ?? "Narrateur"] as "oscar" | "nova" | "milo" | "sia" | "nox";
  const expression = { calm: "curious", happy: "happy", worried: "surprised", determined: "focused" }[dialogue?.mood ?? "calm"] as "curious" | "happy" | "surprised" | "focused";
  return <>
    <button type="button" className="cinematic-replay" onClick={() => { setIndex(0); setVisible(true); }}>🎬 Revoir la cinématique</button>
    {loading ? null : visible && dialogue ? <div className={`cinematic-overlay cinematic-overlay--${scene.theme}`} role="dialog" aria-modal="true" aria-label={scene.title}>
      <Sparkles count={18} />
      <button type="button" className="cinematic-skip" onClick={close}>Passer ⏭</button>
      <div className="cinematic-stage">
        <div className="cinematic-symbol" aria-hidden="true">{scene.symbol}</div>
        <div className="cinematic-heading"><small>{scene.subtitle}</small><h1>{scene.title}</h1></div>
        <div className="cinematic-dialogue" key={`${scene.id}-${index}`}>
          <CharacterPortrait character={portrait} expression={expression} size="large" label={`Portrait de ${dialogue.speaker}`} />
          <div><strong>{dialogue.speaker}</strong><p>{dialogue.text}</p></div>
        </div>
        <div className="cinematic-footer"><span>{index + 1}/{scene.dialogues.length}</span><button type="button" onClick={next}>{index === scene.dialogues.length - 1 ? "Commencer l’aventure →" : "Continuer →"}</button></div>
      </div>
    </div> : null}
  </>;
}
