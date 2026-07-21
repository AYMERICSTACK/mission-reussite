"use client";

import { useMemo, useState } from "react";
import type { WorldAtlasEntry } from "@/lib/content/adventure-worlds";
import styles from "./WorldAtlas.module.css";
import { CharacterPortrait } from "@/components/illustrations/CharacterPortrait";
import { WorldScene } from "@/components/illustrations/WorldScene";
import { WORLD_ART } from "@/lib/art/art-pack";

type WorldAtlasProps = {
  worlds: WorldAtlasEntry[];
  totalXp: number;
  firstName: string;
};

function joinClasses(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function WorldAtlas({ worlds, totalXp, firstName }: WorldAtlasProps) {
  const activeIndex = Math.max(0, worlds.findIndex((world) => world.active));
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);
  const selected = worlds[selectedIndex] ?? worlds[0];
  const selectedArt = WORLD_ART[selected.sceneId];
  const discoveredCount = worlds.filter((world) => world.available).length;
  const nextWorld = useMemo(() => worlds.find((world) => !world.available), [worlds]);
  const universeProgress = nextWorld
    ? Math.min(99, Math.round((totalXp / nextWorld.unlockXp) * 100))
    : 100;
  const routeProgress = worlds.length > 1
    ? Math.max(0, Math.min(100, ((discoveredCount - 1) / (worlds.length - 1)) * 100))
    : 100;

  return (
    <section className={styles.atlas} aria-labelledby="world-atlas-title">
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>Univers de Mission Réussite</span>
          <h2 className={styles.title} id="world-atlas-title">La carte des mondes</h2>
          <p className={styles.intro}>
            {firstName}, avance de territoire en territoire, rencontre de nouveaux gardiens et révèle les trésors cachés de ton aventure.
          </p>
        </div>

        <div className={styles.progressCard} aria-label={`${discoveredCount} mondes découverts sur ${worlds.length}`}>
          <div className={styles.progressTop}>
            <strong>{discoveredCount}/{worlds.length}</strong>
            <span>mondes découverts</span>
          </div>
          <div className={styles.progressBar}><span style={{ width: `${universeProgress}%` }} /></div>
          <span className={styles.nextLabel}>
            {nextWorld ? `Prochain monde à ${nextWorld.unlockXp} XP` : "Tous les mondes sont révélés"}
          </span>
        </div>
      </header>

      <div className={styles.routeWrap}>
        <div className={styles.routeLine} aria-hidden="true"><span style={{ width: `${routeProgress}%` }} /></div>
        <div className={styles.route} role="list" aria-label="Mondes de l’aventure">
          {worlds.map((world, index) => {
            const selectedWorld = selectedIndex === index;
            return (
              <button
                type="button"
                className={joinClasses(
                  styles.worldButton,
                  world.available ? styles.unlocked : styles.locked,
                  world.active && styles.active,
                  selectedWorld && styles.selected,
                )}
                key={world.id}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedWorld}
              >
                <small className={styles.worldNumber}>Monde {world.order}</small>
                <span className={styles.worldOrb} aria-hidden="true"><WorldScene scene={world.sceneId} locked={!world.available} /></span>
                <strong className={styles.worldName}>{world.name}</strong>
                <span className={styles.worldState}>
                  {world.active ? "Aventure actuelle" : world.available ? "Monde découvert" : `${world.unlockXp} XP`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <article className={joinClasses(styles.focus, styles[`theme${selected.order}`])}>
        <div className={styles.visual}>
          <WorldScene scene={selected.sceneId} locked={!selected.available} priority />
          <span className={styles.visualBadge}>Monde {selected.order}</span>
          <span className={styles.visualCaption}>{selected.landscape}</span>
          {!selectedArt.embeddedGuardian ? (
            <CharacterPortrait className={styles.visualGuardian} character={selected.guardian.characterId} expression={selected.guardian.expression} size="large" label={`${selected.guardian.name}, ${selected.guardian.role}`} />
          ) : null}
        </div>

        <div className={styles.content}>
          <span className={styles.status}>
            {selected.active
              ? "Ton aventure actuelle"
              : selected.available
                ? "Territoire découvert"
                : "Territoire encore mystérieux"}
          </span>
          <h3>{selected.name}</h3>
          <strong className={styles.subtitle}>{selected.subtitle}</strong>
          <p className={styles.story}>{selected.story}</p>

          <div className={styles.tags}>
            {selected.subjects.map((subject) => <span key={subject}>{subject}</span>)}
          </div>

          <div className={styles.details}>
            <div className={styles.detailCard}>
              <CharacterPortrait className={styles.detailPortrait} character={selected.guardian.characterId} expression={selected.guardian.expression} size="small" />
              <p>
                <small>Gardien du monde</small>
                <strong>{selected.guardian.name}</strong>
                <em>{selected.guardian.role}</em>
              </p>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon} aria-hidden="true">🏆</span>
              <p>
                <small>Trésor légendaire</small>
                <strong>{selected.treasure}</strong>
                <em>À révéler au terme du monde</em>
              </p>
            </div>
          </div>

          <div className={styles.actionRow}>
            {selected.available ? (
              <a className={styles.action} href="#aventure-actuelle">
                {selected.active ? "Continuer l’exploration" : "Monde prêt pour la suite"}
              </a>
            ) : (
              <div className={styles.unlock}>
                <strong>Encore {Math.max(0, selected.unlockXp - totalXp)} XP à gagner</strong>
                <span>Continue tes quêtes pour révéler ce territoire.</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
