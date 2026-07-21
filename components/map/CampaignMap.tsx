"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NarrativeChapterProgress } from "@/lib/narrative/types";
import styles from "./CampaignMap.module.css";
import { Sparkles } from "@/components/effects/Sparkles";
import { playSound, setAmbience, stopAmbience } from "@/lib/audio/audio-engine";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

type Props = {
  childSlug: string;
  firstName: string;
  seasonTitle: string;
  seasonTwoTitle: string;
  chapters: NarrativeChapterProgress[];
};

type Equipment = { body: string | null; outfit: string | null; head: string | null; accessory: string | null; companion: string | null };

const zones = [
  { name: "Forêt des Mille Secrets", symbol: "🌲", from: 1, to: 5 },
  { name: "Vallée des Explorateurs", symbol: "🏞️", from: 6, to: 10 },
  { name: "Royaume des Échos", symbol: "⛰️", from: 11, to: 15 },
  { name: "Citadelle des Nuages", symbol: "☁️", from: 16, to: 20 },
  { name: "Terres d’Émeraude", symbol: "💚", from: 21, to: 25 },
  { name: "Tour de l’Éclipse", symbol: "🌑", from: 26, to: 30 },
];

export function CampaignMap({ childSlug, firstName, seasonTitle, seasonTwoTitle, chapters }: Props) {
  const foundCurrentIndex = chapters.findIndex((item) => !item.locked && !item.completed);
  const currentIndex = foundCurrentIndex === -1 ? Math.max(0, chapters.length - 1) : foundCurrentIndex;
  const [selected, setSelected] = useState(currentIndex);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const completed = chapters.filter((item) => item.completed).length;
  const selectedChapter = chapters[selected] ?? chapters[0];
  const seasonComplete = completed === chapters.length;

  useEffect(() => {
    fetch(`/api/avatar?child=${encodeURIComponent(childSlug)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => payload?.equipment && setEquipment(payload.equipment))
      .catch(() => undefined);
  }, [childSlug]);

  useEffect(() => { setAmbience("space"); return () => stopAmbience(500); }, []);

  const heroSymbols = useMemo(() => {
    const body = equipment?.body === "body-starlight" ? "🧑‍🚀" : "🧒";
    const companion = equipment?.companion === "companion-fox" ? "🦊" : equipment?.companion === "companion-nova" ? "✨" : "🦉";
    return { body, companion };
  }, [equipment]);

  return (
    <main className={styles.shell}>
      <TutorialOverlay childSlug={childSlug} page="map" autoEvent="map-opened" />
      <header className={styles.header}>
        <Link href={`/mission/${childSlug}`} className={styles.back}>← Mon aventure</Link>
        <div>
          <span className={styles.kicker}>Saison 1 · {seasonTitle}</span>
          <h1>La grande carte de {firstName}</h1>
          <p>Choisis un lieu accessible, suis les chemins lumineux et atteins le Seigneur de l’Ombre.</p>
        </div>
        <div className={styles.progress}><strong>{completed}/30</strong><span>chapitres terminés</span><i><b style={{ width: `${Math.round(completed / 30 * 100)}%` }} /></i></div>
      </header>

      <section className={styles.map} aria-label="Carte interactive de la Saison 1">
        <div className={styles.sky} aria-hidden="true">✦　·　✧　·　✦　·　✧</div>
        {zones.map((zone, zoneIndex) => {
          const zoneChapters = chapters.slice(zone.from - 1, zone.to);
          const zoneUnlocked = zoneChapters.some((chapter) => !chapter.locked);
          return (
            <section className={`${styles.zone} ${!zoneUnlocked ? styles.zoneLocked : ""}`} key={zone.name}>
              <div className={styles.zoneTitle}><span>{zoneUnlocked ? zone.symbol : "🔒"}</span><div><small>Monde {zoneIndex + 1}</small><h2>{zone.name}</h2></div></div>
              <div className={styles.path}>
                {zoneChapters.map((chapter, localIndex) => {
                  const index = zone.from - 1 + localIndex;
                  const isCurrent = index === currentIndex;
                  const status = chapter.completed ? "done" : chapter.locked ? "locked" : "ready";
                  return (
                    <div className={styles.nodeWrap} key={chapter.chapter.id}>
                      {localIndex > 0 && <span className={`${styles.connector} ${chapter.locked ? "" : styles.connectorOn}`} />}
                      <button type="button" className={`${styles.node} ${styles[status]} ${selected === index ? styles.selected : ""} ${chapter.chapter.isBoss ? styles.boss : ""}`} onClick={() => { setSelected(index); playSound(chapter.locked ? "error" : "transition"); }}>
                        <span className={styles.nodeIcon}>{chapter.locked ? "🔒" : chapter.completed ? "✓" : chapter.chapter.symbol}</span>
                        <small>Chapitre {chapter.chapter.number}</small>
                        <strong>{chapter.chapter.title}</strong>
                        {isCurrent && <em>Ton héros est ici</em>}
                      </button>
                      {isCurrent && <div className={styles.heroTrail} aria-hidden="true"><Sparkles count={6} /></div>}{isCurrent && <div className={styles.hero} aria-label="Position actuelle du héros"><span>{heroSymbols.body}</span><b>{heroSymbols.companion}</b></div>}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        <div className={`${styles.seasonTwo} ${seasonComplete ? styles.seasonTwoUnlocked : ""}`}>
          <span>{seasonComplete ? "⏳" : "🔒"}</span><div><small>Saison 2</small><strong>{seasonTwoTitle}</strong><p>{seasonComplete ? "Débloquée · Bientôt disponible" : "Termine la Saison 1 pour révéler ce nouveau monde."}</p></div>
        </div>
      </section>

      {selectedChapter && (
        <aside className={styles.detail} aria-live="polite">
          <div className={styles.detailSymbol}>{selectedChapter.locked ? "🔒" : selectedChapter.chapter.symbol}{!selectedChapter.locked ? <Sparkles count={5} /> : null}</div>
          <div className={styles.detailCopy}><small>Chapitre {selectedChapter.chapter.number} · {selectedChapter.chapter.location}</small><h2>{selectedChapter.chapter.title}</h2><p>{selectedChapter.chapter.summary}</p><div className={styles.detailBar}><span style={{ width: `${selectedChapter.percent}%` }} /></div><strong>{selectedChapter.completedMissionCount}/{selectedChapter.totalMissionCount} missions · {selectedChapter.percent}%</strong></div>
          {selectedChapter.locked ? <span className={styles.lockMessage}>Termine le chapitre précédent</span> : <Link href={`/mission/${childSlug}/chapitres/${selectedChapter.chapter.slug}`}>{selectedChapter.completed ? "Rejouer ce chapitre" : "Entrer dans ce chapitre"} →</Link>}
        </aside>
      )}
    </main>
  );
}
