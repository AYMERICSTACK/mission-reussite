"use client";

import { useState } from "react";
import type { AdventureInventory as AdventureInventoryData, AdventureCollectible } from "@/lib/game/adventure-inventory";

type Tab = "treasures" | "companions" | "journal";

type Props = {
  inventory: AdventureInventoryData;
  worldName: string;
  stageNames: Array<{ id: string; name: string; symbol: string }>;
};

function CollectionItem({ item }: { item: AdventureCollectible }) {
  return (
    <article className={`collection-item ${item.unlocked ? "is-unlocked" : "is-locked"}`}>
      <div className="collection-item__symbol" aria-hidden="true">{item.unlocked ? item.symbol : "?"}</div>
      <div className="collection-item__copy">
        <span>{item.unlocked ? "Découvert" : `${item.progress}/${item.target}`}</span>
        <h3>{item.unlocked ? item.name : "Secret à découvrir"}</h3>
        <p>{item.unlocked ? item.description : "Continue tes quêtes pour révéler cet élément de la collection."}</p>
        {!item.unlocked ? <div className="collection-item__progress"><span style={{ width: `${Math.round((item.progress / item.target) * 100)}%` }} /></div> : null}
      </div>
    </article>
  );
}

export function AdventureInventory({ inventory, worldName, stageNames }: Props) {
  const [tab, setTab] = useState<Tab>("treasures");
  const collection = tab === "treasures" ? [...inventory.treasures, ...inventory.relics] : inventory.companions;

  return (
    <section className="adventure-inventory" aria-label="Sac et journal d’aventure">
      <header className="adventure-inventory__header">
        <div>
          <span>Mon aventure</span>
          <h2>Sac, trésors et journal</h2>
          <p>{inventory.worldMessage}</p>
        </div>
        <div className="adventure-inventory__score">
          <strong>{inventory.unlockedCount}/{inventory.totalCount}</strong>
          <small>éléments découverts</small>
        </div>
      </header>

      <div className="adventure-inventory__tabs" role="tablist" aria-label="Collections">
        <button type="button" role="tab" aria-selected={tab === "treasures"} className={tab === "treasures" ? "is-active" : ""} onClick={() => setTab("treasures")}>🎒 Mes trésors</button>
        <button type="button" role="tab" aria-selected={tab === "companions"} className={tab === "companions" ? "is-active" : ""} onClick={() => setTab("companions")}>🤝 Mes compagnons</button>
        <button type="button" role="tab" aria-selected={tab === "journal"} className={tab === "journal" ? "is-active" : ""} onClick={() => setTab("journal")}>📖 Mon journal</button>
      </div>

      {tab === "journal" ? (
        <div className="adventure-journal">
          <div className="adventure-journal__world"><span>🗺️</span><div><small>Monde exploré</small><h3>{worldName}</h3><p>{inventory.completedQuestIds.length} quête{inventory.completedQuestIds.length > 1 ? "s" : ""} différente{inventory.completedQuestIds.length > 1 ? "s" : ""} accomplie{inventory.completedQuestIds.length > 1 ? "s" : ""}.</p></div></div>
          <div className="adventure-journal__stages">
            {stageNames.map((stage, index) => {
              const explored = inventory.exploredStageIds.includes(stage.id);
              return <article key={stage.id} className={explored ? "is-explored" : ""}><span>{explored ? stage.symbol : "🔒"}</span><div><small>Étape {index + 1}</small><strong>{stage.name}</strong><p>{explored ? "Lieu visité — son histoire est inscrite dans ton journal." : "Ce lieu apparaîtra après tes prochaines aventures."}</p></div></article>;
            })}
          </div>
        </div>
      ) : (
        <div className="adventure-collection-grid">
          {collection.map((item) => <CollectionItem key={item.id} item={item} />)}
        </div>
      )}
    </section>
  );
}
