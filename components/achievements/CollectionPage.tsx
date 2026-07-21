import Link from "next/link";
import { BadgeCard } from "./BadgeCard";
import type { AchievementCategory, AchievementCollection } from "@/lib/achievements/achievements";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

const sections: Array<{ id: AchievementCategory; label: string; title: string }> = [
  { id: "adventure", label: "Exploration", title: "Succès d’aventure" },
  { id: "learning", label: "Savoirs", title: "Talents pédagogiques" },
  { id: "mastery", label: "Maîtrise", title: "Exploits remarquables" },
  { id: "streak", label: "Régularité", title: "Séries et habitudes" },
  { id: "autonomy", label: "Autonomie", title: "Pouvoirs d’apprentissage" },
  { id: "heroism", label: "Boss", title: "Exploits héroïques" },
  { id: "collection", label: "Trésors", title: "Collection et récompenses" },
];

export function CollectionPage({ firstName, backHref, collection, childSlug }: { firstName: string; backHref: string; collection: AchievementCollection; childSlug: string }) {
  return <main className="collection-page">
    <TutorialOverlay childSlug={childSlug} page="collection" autoEvent="collection-opened" />
    <header className="collection-hero">
      <nav><Link href={backHref}>← Retour à mon aventure</Link><span>Mission Réussite · Collection</span></nav>
      <div className="collection-hero__content"><div><span className="collection-eyebrow">Cabinet des merveilles</span><h1>La collection de {firstName}</h1><p>Chaque badge raconte une étape franchie, une habitude construite ou une compétence qui grandit.</p></div><div className="collection-hero__medal"><span>🏆</span><strong>{collection.completionPercent}%</strong><small>de la collection</small></div></div>
      <div className="collection-stats"><article><strong>{collection.unlockedCount}</strong><span>Succès obtenus</span></article><article><strong>Niv. {collection.heroLevel}</strong><span>Niveau héroïque</span></article><article><strong>{collection.totalCorrectAnswers}</strong><span>Bonnes réponses</span></article><article><strong>{collection.trophyCabinet.filter(t => t.obtained).length}/4</strong><span>Trophées de boss</span></article></div>
    </header>
    <div className="collection-content">
      <section className="trophy-cabinet"><div className="trophy-cabinet__heading"><span>Galerie des boss</span><h2>Les trophées légendaires</h2><p>Chaque gardien vaincu laisse une trace unique de ton courage.</p></div><div className="trophy-cabinet__grid">{collection.trophyCabinet.map(trophy => <article key={trophy.id} className={trophy.obtained ? "is-obtained" : "is-locked"}><span>{trophy.obtained ? trophy.symbol : "🔒"}</span><div><strong>{trophy.obtained ? trophy.name : "Trophée mystérieux"}</strong><p>{trophy.obtained ? trophy.description : "Vaincs le boss correspondant pour révéler ce trophée."}</p></div></article>)}</div></section>
      {collection.recentUnlocks.length ? <section className="recent-badges"><div><span>Nouveautés</span><h2>Derniers succès débloqués</h2></div><div>{collection.recentUnlocks.map(badge => <div key={badge.id} className={`recent-badge recent-badge--${badge.rarity}`}><span>{badge.symbol}</span><p><small>{badge.name}</small><strong>{badge.description}</strong></p></div>)}</div></section> : <section className="recent-badges recent-badges--empty"><span>✨</span><div><h2>Ta collection est prête</h2><p>Termine une première mission pour voir ton premier badge apparaître ici.</p></div></section>}
      {sections.map(section => { const badges = collection.achievements.filter(badge => badge.category === section.id); return badges.length ? <section className="collection-section" key={section.id}><div className="collection-section__heading"><div><span>{section.label}</span><h2>{section.title}</h2></div><strong>{badges.filter(b => b.unlocked).length}/{badges.length}</strong></div><div className="badge-grid">{badges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}</div></section> : null; })}
    </div>
  </main>;
}
