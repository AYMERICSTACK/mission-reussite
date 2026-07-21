import Link from "next/link";
import type { AchievementCollection } from "@/lib/achievements/achievements";

export function CollectionPreview({ collection, href }: { collection: AchievementCollection; href: string }) {
  const next = collection.locked.sort((a, b) => b.progressPercent - a.progressPercent)[0];
  return <section className="collection-preview">
    <div className="collection-preview__copy"><span>Collection & succès</span><h2>Ton cabinet de badges</h2><p>{collection.unlockedCount ? `${collection.unlockedCount} badge${collection.unlockedCount > 1 ? "s" : ""} déjà obtenu${collection.unlockedCount > 1 ? "s" : ""}.` : "Ta première récompense t’attend."} Chaque aventure peut révéler un nouveau succès.</p><Link href={href}>Ouvrir ma collection <span aria-hidden="true">→</span></Link></div>
    <div className="collection-preview__score"><div><strong>{collection.completionPercent}%</strong><span>complété</span></div><p>{collection.unlockedCount}/{collection.totalCount} badges</p></div>
    <div className="collection-preview__badges">{collection.recentUnlocks.length ? collection.recentUnlocks.map((badge) => <div key={badge.id} className={`mini-badge mini-badge--${badge.rarity}`} title={badge.name}><span>{badge.symbol}</span><small>{badge.name}</small></div>) : <div className="mini-badge is-mystery"><span>?</span><small>Premier badge</small></div>}</div>
    {next ? <div className="collection-preview__next"><span>Presque débloqué</span><strong>{next.symbol} {next.name}</strong><div><i style={{ width: `${next.progressPercent}%` }} /></div><small>{next.progress}/{next.target}</small></div> : <div className="collection-preview__next"><span>Collection complète</span><strong>🏆 Tous les succès sont à toi</strong></div>}
  </section>;
}
