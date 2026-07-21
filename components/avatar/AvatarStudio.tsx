"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./AvatarStudio.module.css";
import type { AvatarItem, AvatarSlot } from "@/lib/game/avatar-catalog";
import { ConfettiLite } from "@/components/effects/ConfettiLite";
import { Sparkles } from "@/components/effects/Sparkles";
import { gentleVibration, playSound, setAmbience, stopAmbience } from "@/lib/audio/audio-engine";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

type Data = {
  child: { slug: string; firstName: string };
  catalog: AvatarItem[];
  completedMissionCount: number;
  coins: number;
  claimedChests: number;
  availableChests: number;
  unopenedChests: number;
  unlockedItemIds: string[];
  equipment: Record<AvatarSlot, string | null>;
};

const slots: Array<{ id: AvatarSlot; label: string }> = [
  { id: "body", label: "Avatar" }, { id: "outfit", label: "Tenues" }, { id: "head", label: "Coiffes" }, { id: "accessory", label: "Accessoires" }, { id: "companion", label: "Compagnons" },
];
const rarityLabel = { common: "Commun", rare: "Rare", epic: "Épique", legendary: "Légendaire" };

export function AvatarStudio({ childSlug }: { childSlug: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<AvatarSlot>("outfit");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => { fetch(`/api/avatar?child=${encodeURIComponent(childSlug)}`).then((r) => r.json()).then(setData); }, [childSlug]);
  useEffect(() => { setAmbience("quiet"); return () => stopAmbience(350); }, []);
  const itemMap = useMemo(() => new Map(data?.catalog.map((item) => [item.id, item]) ?? []), [data]);
  if (!data) return <main className={styles.shell}><div className={styles.preview}>Préparation de ton atelier d’aventurier…</div></main>;

  const equipped = (slot: AvatarSlot) => data.equipment[slot] ? itemMap.get(data.equipment[slot]!) : undefined;
  const visibleItems = data.catalog.filter((item) => item.slot === tab);

  async function equip(item: AvatarItem) {
    if (!data || !data.unlockedItemIds.includes(item.id) || busy) return;
    setBusy(true); setNotice("");
    const remove = item.slot !== "body" && data.equipment[item.slot] === item.id;
    const response = await fetch("/api/avatar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ childSlug, slot: item.slot, itemId: remove ? null : item.id }) });
    const next = await response.json();
    if (response.ok) { setData(next); playSound("character"); } else { setNotice(next.error ?? "Impossible d’équiper cet objet."); playSound("error"); }
    setBusy(false);
  }

  async function openChest() {
    if (!data || !data.unopenedChests || busy) return;
    setBusy(true); setNotice("");
    const response = await fetch("/api/avatar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ childSlug, action: "open-chest" }) });
    const next = await response.json();
    if (response.ok) { setData(next); setNotice(`🎉 ${next.reward.name} débloqué et ${next.coinReward} pièces gagnées !`); setCelebrating(true); playSound("chest"); gentleVibration([24, 35, 24]); window.setTimeout(() => playSound("badge"), 280); window.setTimeout(() => setCelebrating(false), 2200); }
    else { setNotice(next.error ?? "Le coffre refuse de s’ouvrir."); playSound("error"); }
    setBusy(false);
  }

  return <main className={styles.shell}>
    <TutorialOverlay childSlug={childSlug} page="avatar" />
    <ConfettiLite active={celebrating} />
    <header className={styles.topbar}>
      <Link className={styles.back} href={`/mission/${childSlug}`}>← Retour à l’aventure</Link>
      <div className={styles.wallet}><span>🪙 {data.coins} pièces</span><span>✅ {data.completedMissionCount} missions</span></div>
    </header>
    <div className={styles.grid}>
      <section className={styles.preview}>
        <span className={styles.eyebrow}>Atelier d’avatar</span><h1>{data.child.firstName}, crée ton héros</h1><p>Équipe les objets découverts pendant tes aventures. Chaque mission peut révéler une nouvelle surprise.</p>
        <div className={styles.avatar} aria-label="Aperçu de l’avatar">
          <span className={styles.body}>{equipped("body")?.symbol ?? "🧒"}</span>
          {equipped("head") ? <span className={`${styles.layer} ${styles.head}`}>{equipped("head")?.symbol}</span> : null}
          {equipped("outfit") ? <span className={`${styles.layer} ${styles.outfit}`}>{equipped("outfit")?.symbol}</span> : null}
          {equipped("accessory") ? <span className={`${styles.layer} ${styles.accessory}`}>{equipped("accessory")?.symbol}</span> : null}
          {equipped("companion") ? <span className={`${styles.layer} ${styles.companion}`}>{equipped("companion")?.symbol}</span> : null}
        </div>
        <div className={styles.equipment}>{slots.map((slot) => <span key={slot.id}>{slot.label} : {equipped(slot.id)?.name ?? "Aucun"}</span>)}</div>
      </section>
      <div className={styles.content}>
        <section className={styles.chests}>
          <div className={styles.sectionTitle}><div><span className={styles.eyebrow}>Récompenses</span><h2>Les coffres d’aventure</h2></div><p>{data.unopenedChests} coffre{data.unopenedChests > 1 ? "s" : ""} prêt{data.unopenedChests > 1 ? "s" : ""}</p></div>
          <div className={styles.chestBox}><div className={`${styles.chestIcon} ${data.unopenedChests ? styles.chestReady : ""}`}>{data.unopenedChests ? "🎁" : "📦"}{data.unopenedChests ? <Sparkles count={8} /> : null}</div><div><h3>{data.unopenedChests ? "Un coffre t’attend !" : "Prochain coffre en préparation"}</h3><p>Un coffre est gagné toutes les six missions différentes. Il contient un objet exclusif et des pièces.</p></div><button className={styles.openButton} type="button" disabled={!data.unopenedChests || busy} onClick={openChest}>{busy ? "Ouverture…" : "Ouvrir le coffre"}</button></div>
          {notice ? <div className={styles.notice}>{notice}</div> : null}
        </section>
        <section className={styles.wardrobe}>
          <div className={styles.sectionTitle}><div><span className={styles.eyebrow}>Inventaire</span><h2>Ma garde-robe d’aventurier</h2></div><p>{data.unlockedItemIds.length}/{data.catalog.length} objets</p></div>
          <div className={styles.tabs}>{slots.map((slot) => <button key={slot.id} type="button" className={tab === slot.id ? styles.active : ""} onClick={() => setTab(slot.id)}>{slot.label}</button>)}</div>
          <div className={styles.items}>{visibleItems.map((item) => { const unlocked = data.unlockedItemIds.includes(item.id); const isEquipped = data.equipment[item.slot] === item.id; return <button type="button" key={item.id} disabled={!unlocked || busy} onClick={() => equip(item)} className={`${styles.item} ${styles[item.rarity]} ${isEquipped ? styles.equipped : ""}`}><span className={styles.itemSymbol}>{unlocked ? item.symbol : "❔"}</span><span><small className={styles.rarity}>{rarityLabel[item.rarity]} {isEquipped ? "· Équipé" : ""}</small><strong>{unlocked ? item.name : "Objet mystérieux"}</strong><small>{unlocked ? item.description : item.unlock.type === "missions" ? `Termine ${item.unlock.value} missions différentes.` : "À découvrir dans un coffre."}</small></span>{!unlocked ? <span className={styles.lock}>🔒</span> : null}</button>; })}</div>
        </section>
      </div>
    </div>
  </main>;
}
