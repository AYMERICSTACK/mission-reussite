"use client";

import { useState } from "react";
import styles from "./SideQuestBoard.module.css";
import type { SideQuestView } from "@/lib/game/side-quests";

export type SideQuestPayload = {
  quests: SideQuestView[];
  wallet: { coins: number; bonusXp: number; badgeIds: string[] };
  summary: { available: number; active: number; claimable: number; claimed: number };
  notice?: string;
  error?: string;
};

const npcNames = { oscar: "Oscar", nova: "Nova", lyra: "Lyra", kael: "Kael", orion: "Orion" } as const;
const statusLabels = { locked: "Verrouillée", available: "Disponible", active: "En cours", claimable: "À récupérer", claimed: "Terminée" } as const;

export function SideQuestBoard({ childSlug, initialData }: { childSlug: string; initialData: SideQuestPayload }) {
  const [data, setData] = useState(initialData);
  const [busyQuestId, setBusyQuestId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  async function runAction(questId: string, action: "accept" | "claim") {
    if (busyQuestId) return;
    setBusyQuestId(questId);
    setNotice("");
    try {
      const response = await fetch("/api/side-quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childSlug, questId, action }),
      });
      const next = await response.json() as SideQuestPayload;
      if (!response.ok) throw new Error(next.error ?? "Impossible de mettre à jour la quête.");
      setData(next);
      setNotice(next.notice ?? "Quête mise à jour !");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setBusyQuestId(null);
    }
  }

  return <section className={styles.board} id="quetes-secondaires" aria-labelledby="side-quest-title">
    <div className={styles.heading}>
      <div><span>Tableau des quêtes</span><h2 id="side-quest-title">Les missions des habitants</h2><p>Accepte une quête, poursuis ton aventure puis reviens chercher ta récompense.</p></div>
      <div className={styles.wallet}><strong>🪙 {data.wallet.coins}</strong><span>✨ {data.wallet.bonusXp} XP bonus</span></div>
    </div>

    <div className={styles.summary} aria-label="Résumé des quêtes">
      <span>📬 {data.summary.available} disponible{data.summary.available > 1 ? "s" : ""}</span>
      <span>🎯 {data.summary.active} en cours</span>
      <span className={data.summary.claimable ? styles.highlight : ""}>🎁 {data.summary.claimable} récompense{data.summary.claimable > 1 ? "s" : ""}</span>
      <span>✅ {data.summary.claimed} terminée{data.summary.claimed > 1 ? "s" : ""}</span>
    </div>

    {notice && <p className={styles.notice} role="status">{notice}</p>}

    <div className={styles.grid}>
      {data.quests.map((quest) => <article className={`${styles.quest} ${styles[quest.status]}`} key={quest.id}>
        <div className={styles.questTop}><span className={styles.symbol}>{quest.symbol}</span><div><small>{npcNames[quest.npcId]} · {statusLabels[quest.status]}</small><h3>{quest.title}</h3></div></div>
        <p>{quest.description}</p>
        <strong className={styles.objective}>{quest.objectiveLabel}</strong>
        <div className={styles.progress}><span><i style={{ width: `${quest.percent}%` }} /></span><b>{quest.progress}/{quest.target}</b></div>
        <div className={styles.rewards}>
          <span>✨ +{quest.reward.xp} XP</span><span>🪙 +{quest.reward.coins}</span>
          {quest.reward.itemId && <span>🎒 Objet exclusif</span>}
          {quest.reward.badge && <span>🏅 {quest.reward.badge}</span>}
        </div>
        {quest.status === "available" && <button type="button" disabled={busyQuestId === quest.id} onClick={() => runAction(quest.id, "accept")}>{busyQuestId === quest.id ? "Patiente..." : "Accepter la quête"}</button>}
        {quest.status === "active" && <div className={styles.state}>Objectif en cours…</div>}
        {quest.status === "claimable" && <button className={styles.claimButton} type="button" disabled={busyQuestId === quest.id} onClick={() => runAction(quest.id, "claim")}>{busyQuestId === quest.id ? "Ouverture..." : "Récupérer la récompense"}</button>}
        {quest.status === "claimed" && <div className={styles.done}>✓ Récompense récupérée</div>}
        {quest.status === "locked" && <div className={styles.lockedMessage}>🔒 Continue l’aventure pour la débloquer</div>}
      </article>)}
    </div>
  </section>;
}
