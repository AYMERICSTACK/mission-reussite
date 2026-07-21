"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdventureWorld } from "@/lib/content/adventure-worlds";
import { CharacterPortrait } from "@/components/illustrations/CharacterPortrait";
import { WorldScene } from "@/components/illustrations/WorldScene";

type AdventureMapProps = {
  world: AdventureWorld;
  firstName: string;
  totalXp: number;
  completedToday: number;
  missionCount: number;
  worldLevel?: number;
};

export function AdventureMap({ world, firstName, totalXp, completedToday, missionCount, worldLevel = 0 }: AdventureMapProps) {
  const unlockedCount = useMemo(
    () => world.stages.filter((stage) => totalXp >= stage.unlockXp).length,
    [totalXp, world.stages],
  );
  const activeIndex = Math.max(0, Math.min(world.stages.length - 1, unlockedCount - 1));
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);
  const [showIntro, setShowIntro] = useState(false);
  const selectedStage = world.stages[selectedIndex];
  const worldProgress = Math.min(100, Math.round((totalXp / world.stages.at(-1)!.unlockXp) * 100));

  useEffect(() => {
    const key = `mission-reussite:intro:${firstName}:${world.chapter}`;
    if (window.sessionStorage.getItem(key)) return;
    const timer = window.setTimeout(() => setShowIntro(true), 0);
    return () => window.clearTimeout(timer);
  }, [firstName, world.chapter]);

  function closeIntro() {
    const key = `mission-reussite:intro:${firstName}:${world.chapter}`;
    window.sessionStorage.setItem(key, "seen");
    setShowIntro(false);
  }

  return (
    <>
      {showIntro ? (
        <div className="adventure-intro" role="dialog" aria-modal="true" aria-labelledby="adventure-intro-title">
          <div className="adventure-intro__backdrop" />
          <div className="adventure-intro__card">
            <span className="adventure-intro__chapter">{world.eyebrow}</span>
            <CharacterPortrait className="adventure-intro__portrait" character={world.guideCharacterId} expression="happy" size="large" label={`${world.guideName}, ${world.guideRole}`} />
            <p className="adventure-intro__world">{world.name}</p>
            <h2 id="adventure-intro-title">{world.openingLine}</h2>
            <p>{world.openingMessage}</p>
            <div className="adventure-intro__guide">
              <CharacterPortrait character={world.guideCharacterId} expression="happy" size="small" />
              <div><strong>{world.guideName}</strong><small>{world.guideRole}</small></div>
            </div>
            <button type="button" onClick={closeIntro}>Entrer dans l’aventure</button>
          </div>
        </div>
      ) : null}

      <section className={`adventure-world adventure-world--level-${worldLevel}`} aria-label="Carte de l’aventure">
        <div className="adventure-world__story">
          <WorldScene scene={world.sceneId} className="adventure-world__illustration" />
          <div className="adventure-world__title">
            <span>{world.guideSymbol}</span>
            <div>
              <small>{world.guideName}, {world.guideRole}</small>
              <h2>{world.chapter}</h2>
            </div>
          </div>
          <p>{world.story}</p>
          <div className="adventure-companions" aria-label="Compagnons de l’aventure">
            {world.companions.map((companion) => (
              <div key={companion.name} title={companion.role}>
                <CharacterPortrait character={companion.characterId} expression={companion.expression} size="small" />
                <p><strong>{companion.name}</strong><small>{companion.role}</small></p>
              </div>
            ))}
          </div>
        </div>

        <div className="adventure-map">
          <div className="adventure-map__head">
            <div><small>Carte du chapitre</small><strong>{worldProgress}% exploré</strong></div>
            <span>{completedToday}/{missionCount} quêtes aujourd’hui</span>
          </div>

          <div className="adventure-path">
            {world.stages.map((stage, index) => {
              const unlocked = totalXp >= stage.unlockXp;
              const completed = index < activeIndex;
              const active = index === activeIndex;
              return (
                <button
                  type="button"
                  className={`adventure-stage ${completed ? "is-done" : ""} ${active ? "is-active" : ""} ${!unlocked ? "is-locked" : ""} ${selectedIndex === index ? "is-selected" : ""}`}
                  key={stage.id}
                  onClick={() => unlocked && setSelectedIndex(index)}
                  disabled={!unlocked}
                  aria-pressed={selectedIndex === index}
                >
                  <span className="adventure-stage__marker">{unlocked ? stage.symbol : "🔒"}</span>
                  <span className="adventure-stage__copy"><strong>{stage.name}</strong><small>{stage.description}</small></span>
                </button>
              );
            })}
          </div>

          <div className="adventure-scene" aria-live="polite">
            <CharacterPortrait className="adventure-scene__characterPortrait" character={selectedStage.characterId} expression={selectedStage.expression} size="medium" label={`${selectedStage.character} t’attend ici`} />
            <div className="adventure-scene__content">
              <span>{selectedStage.character} t’attend ici</span>
              <h3>{selectedStage.name}</h3>
              <p>{selectedStage.scene}</p>
              <div className="adventure-scene__details">
                <div><small>Objectif</small><strong>{selectedStage.objective}</strong></div>
                <div><small>Trésor du lieu</small><strong>{selectedStage.reward}</strong></div>
              </div>
            </div>
            {totalXp < selectedStage.unlockXp ? (
              <div className="adventure-scene__locked">Encore {selectedStage.unlockXp - totalXp} XP pour ouvrir ce lieu</div>
            ) : (
              <div className="adventure-scene__ready">Lieu accessible</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
