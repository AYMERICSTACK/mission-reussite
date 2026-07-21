"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./VillageHub.module.css";
import { villageNpcs, villagePlaces } from "@/lib/content/village";
import { SideQuestBoard, type SideQuestPayload } from "@/components/quests/SideQuestBoard";
import { Sparkles } from "@/components/effects/Sparkles";
import { playSound, setAmbience, stopAmbience } from "@/lib/audio/audio-engine";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

export function VillageHub({ childSlug, firstName, completedChapters, totalXp, initialQuests }: { childSlug: string; firstName: string; completedChapters: number; totalXp: number; initialQuests: SideQuestPayload }) {
  const [selectedNpcId, setSelectedNpcId] = useState(villageNpcs[0].id);
  const selectedNpc = villageNpcs.find((npc) => npc.id === selectedNpcId) ?? villageNpcs[0];
  useEffect(() => { setAmbience("forest"); return () => stopAmbience(500); }, []);
  const hrefs = { map: `/mission/${childSlug}/carte`, avatar: `/mission/${childSlug}/avatar`, collection: `/mission/${childSlug}/collection`, dashboard: `/mission/${childSlug}`, quests: "#quetes-secondaires" };

  function selectNpc(id: string) { setSelectedNpcId(id); playSound("character"); if (id === "oscar") window.dispatchEvent(new CustomEvent("mission-reussite:tutorial", { detail: "oscar-talked" })); }
  return <main className={styles.shell}>
    <TutorialOverlay childSlug={childSlug} page="village" autoEvent="village-opened" />
    <header className={styles.topbar}>
      <Link className={styles.back} href={`/mission/${childSlug}`}>← Retour à mon aventure</Link>
      <Link className={styles.mapLink} href={`/mission/${childSlug}/carte`}>🗺️ Grande carte</Link>
    </header>

    <section className={styles.hero}>
      <span className={styles.eyebrow}>V20.3 · Le cœur de l’aventure</span>
      <h1>Bienvenue au Village, {firstName} !</h1>
      <p>Entre deux chapitres, retrouve tes alliés, prépare ton héros et choisis le prochain endroit à visiter. Les habitants ont désormais besoin de toi : accepte leurs quêtes secondaires, accomplis leurs objectifs et reviens chercher tes récompenses.</p>
      <div className={styles.stats}><span>⭐ {totalXp} XP</span><span>📖 {completedChapters}/30 chapitres terminés</span><span>🧑‍🤝‍🧑 {villageNpcs.length} alliés présents</span></div>
    </section>

    <section className={styles.village} aria-label="Lieux du village">
      <div className={styles.places}>{villagePlaces.map((place) => <Link className={styles.place} href={hrefs[place.href]} key={place.id}>
        <span className={styles.placeSymbol}>{place.symbol}</span><small>Lieu du village</small><h2>{place.name}</h2><p>{place.description}</p><strong>{place.label} →</strong>
      </Link>)}</div>
    </section>

    <SideQuestBoard childSlug={childSlug} initialData={initialQuests} />

    <section className={styles.npcSection}>
      <div className={styles.sectionTitle}><div><span className={styles.eyebrow}>Les habitants</span><h2>Parle avec tes alliés</h2></div><p>Choisis un personnage pour découvrir son rôle dans le village.</p></div>
      <div className={styles.npcGrid}>{villageNpcs.map((npc) => <button type="button" key={npc.id} onClick={() => selectNpc(npc.id)} className={`${styles.npcButton} ${npc.id === selectedNpc.id ? styles.active : ""}`} aria-pressed={npc.id === selectedNpc.id}><span>{npc.symbol}</span><strong>{npc.name}</strong><small>{npc.role}</small></button>)}</div>
      <article className={styles.dialogue} aria-live="polite"><div className={styles.portrait}>{selectedNpc.symbol}<Sparkles count={7} /></div><div><small>{selectedNpc.location} · {selectedNpc.role}</small><h3>{selectedNpc.name}</h3><blockquote>« {selectedNpc.greeting} »</blockquote><p>{selectedNpc.description}</p></div></article>
    </section>
  </main>;
}
