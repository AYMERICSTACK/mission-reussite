"use client";

import { useEffect, useState } from "react";
import { InteractiveMission } from "@/components/exercises/InteractiveMission";
import type { LearningMission } from "@/lib/content/missions";
import type { NovaMission as GeneratedNovaMission } from "@/lib/pedagogy/nova";

function getDailyCacheKey(target: LearningMission) {
  const day = new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(new Date());
  return `mission-reussite:nova-mission:${target.child}:${target.id}:${day}`;
}

export function NovaMission({ target, backHref }: { target: LearningMission; backHref: string }) {
  const [generated, setGenerated] = useState<GeneratedNovaMission | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const cacheKey = getDailyCacheKey(target);
    const cached = window.sessionStorage.getItem(cacheKey);
    if (!cached) return;
    const timer = window.setTimeout(() => {
      try {
        setGenerated(JSON.parse(cached) as GeneratedNovaMission);
      } catch {
        window.sessionStorage.removeItem(cacheKey);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [target]);

  async function generate() {
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/nova/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child: target.child, missionId: target.id }),
      });
      const data = await response.json() as { mission?: GeneratedNovaMission; error?: string };
      if (!response.ok || !data.mission) throw new Error(data.error || "Génération impossible.");
      window.sessionStorage.setItem(getDailyCacheKey(target), JSON.stringify(data.mission));
      setGenerated(data.mission);
      setState("idle");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Génération impossible.");
      setState("error");
    }
  }

  if (generated) {
    return (
      <InteractiveMission
        {...target}
        missionId={`nova-${target.id}`}
        title={generated.title}
        story={generated.story}
        steps={generated.steps}
        novaIntroduction={generated.introduction}
        novaClosing={generated.closing}
        backHref={backHref}
      />
    );
  }

  return (
    <main className={`nova-shell nova-shell--${target.tone}`}>
      <section className="nova-card">
        <div className="nova-orb">N</div>
        <span>Une aventure spéciale de Nova</span>
        <h1>Prêt pour une histoire inédite ?</h1>
        <p>Ton parcours a déjà choisi le bon défi. Nova va seulement inventer le décor, les dialogues et les surprises autour de cette compétence.</p>
        <div className="nova-target">
          <small>Ton défi du jour</small>
          <strong>{target.objective}</strong>
          <span>Difficulté {target.difficulty}/5 · {target.duration}</span>
        </div>
        <div className="nova-cost-note">
          <span aria-hidden="true">♻️</span>
          <p><strong>Une seule création par jour est conservée sur cet appareil.</strong> La rejouer ne relance pas Nova et ne consomme pas un nouvel appel.</p>
        </div>
        <button type="button" onClick={generate} disabled={state === "loading"}>{state === "loading" ? "Nova prépare ton aventure…" : "Créer mon aventure spéciale"}</button>
        {state === "error" && <p className="nova-error">{error}</p>}
        <a href={backHref}>Retour à mon aventure</a>
      </section>
    </main>
  );
}
