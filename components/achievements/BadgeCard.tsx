import type { AchievementResult } from "@/lib/achievements/achievements";

const rarityLabel = { common: "Commun", rare: "Rare", epic: "Épique", legendary: "Légendaire" } as const;

export function BadgeCard({ badge }: { badge: AchievementResult }) {
  return <article className={`badge-card badge-card--${badge.rarity} ${badge.unlocked ? "is-unlocked" : "is-locked"}`}>
    <div className="badge-card__visual"><span aria-hidden="true">{badge.symbol}</span><i /></div>
    <div className="badge-card__top"><span>{rarityLabel[badge.rarity]}</span>{badge.unlocked ? <strong>Obtenu</strong> : <strong>{badge.progress}/{badge.target}</strong>}</div>
    <h3>{badge.name}</h3>
    <p>{badge.unlocked ? badge.description : badge.secretHint}</p>
    <div className="badge-card__progress"><span style={{ width: `${badge.progressPercent}%` }} /></div>
    {badge.unlockedAt ? <small>Débloqué le {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(badge.unlockedAt))}</small> : <small>{badge.progressPercent}% accompli</small>}
  </article>;
}
