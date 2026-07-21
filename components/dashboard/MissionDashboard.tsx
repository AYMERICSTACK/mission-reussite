import Link from "next/link";
import { MissionLogo } from "@/components/brand/MissionLogo";
import type { AdventureWorld, WorldAtlasEntry } from "@/lib/content/adventure-worlds";
import { AdventureMap } from "@/components/adventure/AdventureMap";
import { WorldAtlas } from "@/components/adventure/WorldAtlas";
import { AdventureInventory } from "@/components/adventure/AdventureInventory";
import type { AdventureInventory as AdventureInventoryData } from "@/lib/game/adventure-inventory";
import type { AdaptiveLearningProfile } from "@/lib/pedagogy/adaptive-learning";
import type { AchievementCollection } from "@/lib/achievements/achievements";
import { CollectionPreview } from "@/components/achievements/CollectionPreview";
import { ChildCooperationCard } from "@/components/cooperation/ChildCooperationCard";
import { AchievementToast } from "@/components/achievements/AchievementToast";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";
import { AdventurePrefetch } from "@/components/navigation/AdventurePrefetch";

type Tone = "ce2" | "sixth";
type IconName =
  | "home"
  | "missions"
  | "book"
  | "math"
  | "pen"
  | "badge"
  | "chart"
  | "profile"
  | "bolt"
  | "brain"
  | "clock"
  | "arrow"
  | "star"
  | "lock"
  | "flame";

type Mission = {
  title: string;
  category: string;
  duration: string;
  xp: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  objective: string;
  skillPath: string[];
  recommendation: string;
  location: string;
  icon: IconName;
  status: "ready" | "locked" | "done";
  color: "purple" | "orange" | "teal" | "blue";
  href?: string;
};

type Skill = {
  label: string;
  value: number;
};

type MissionDashboardProps = {
  firstName: string;
  grade: string;
  tone: Tone;
  level: number;
  levelTitle: string;
  levelSymbol: string;
  levelReward: string;
  xp: number;
  totalXp: number;
  nextLevelXp: number;
  streak: number;
  weeklyProgress: number;
  headline: string;
  message: string;
  focusLabel: string;
  focusValue: string;
  missions: Mission[];
  programLabel: string;
  skills: Skill[];
  novaHref: string;
  world: AdventureWorld;
  worldAtlas: WorldAtlasEntry[];
  inventory: AdventureInventoryData;
  adaptiveProfile: AdaptiveLearningProfile;
  achievementCollection: AchievementCollection;
  collectionHref: string;
  childSlug: string;
  narrative?: { seasonTitle: string; chapterNumber: number; chapterTitle: string; summary: string; symbol: string; percent: number; completed: boolean; href: string };
};

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "home":
      return <svg {...common}><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z" /></svg>;
    case "missions":
      return <svg {...common}><path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h7" /></svg>;
    case "book":
      return <svg {...common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" /></svg>;
    case "math":
      return <svg {...common}><path d="M4 7h6M7 4v6M14 5h6M15 15l5 5M20 15l-5 5" /></svg>;
    case "pen":
      return <svg {...common}><path d="m4 20 4.2-1 10.7-10.7a2.1 2.1 0 0 0-3-3L5.2 16 4 20ZM13.7 7.5l2.8 2.8" /></svg>;
    case "badge":
      return <svg {...common}><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.5 14.5 7 22l5-3 5 3-1.5-7.5" /></svg>;
    case "chart":
      return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
    case "profile":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    case "bolt":
      return <svg {...common}><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" /></svg>;
    case "brain":
      return <svg {...common}><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.3A3.5 3.5 0 0 0 5 15v.5A3.5 3.5 0 0 0 8.5 19H11V5.5a3 3 0 0 0-1.5-1ZM14.5 4.5A3.5 3.5 0 0 1 18 8v.3A3.5 3.5 0 0 1 19 15v.5a3.5 3.5 0 0 1-3.5 3.5H13V5.5a3 3 0 0 1 1.5-1Z" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "arrow":
      return <svg {...common}><path d="m9 5 7 7-7 7" /></svg>;
    case "star":
      return <svg {...common}><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
    case "flame":
      return <svg {...common}><path d="M13 3s1 4-2 6c-2-2-2-4-2-4s-5 4-3 10a6.5 6.5 0 0 0 12 0c1-4-2-7-5-12Z" /></svg>;
  }
}

const navItems: Array<{ label: string; icon: IconName; active?: boolean }> = [
  { label: "Mon aventure", icon: "home", active: true },
  { label: "Mes quêtes", icon: "missions" },
  { label: "Lecture", icon: "book" },
  { label: "Mathématiques", icon: "math" },
  { label: "Français", icon: "pen" },
  { label: "Mes trésors", icon: "badge" },
  { label: "Ma progression", icon: "chart" },
];

export function MissionDashboard(props: MissionDashboardProps) {
  const xpPercent = Math.round((props.xp / props.nextLevelXp) * 100);
  const firstReadyMission = props.missions.find((mission) => mission.status === "ready" && mission.href);
  const completedToday = props.missions.filter((mission) => mission.status === "done").length;
  const adventureHref = props.narrative && !props.narrative.completed
    ? props.narrative.href
    : firstReadyMission?.href ?? props.narrative?.href ?? `/mission/${props.childSlug}/carte`;
  const nextStepTitle = props.narrative && !props.narrative.completed
    ? `Rejoins Oscar dans « ${props.narrative.chapterTitle} »`
    : firstReadyMission
      ? `Ta prochaine mission : ${firstReadyMission.title}`
      : "Explore la carte et découvre la suite";
  const nextStepMessage = props.narrative && !props.narrative.completed
    ? "Oscar a besoin de toi pour poursuivre l’histoire. Le grand bouton t’emmène directement au bon endroit."
    : firstReadyMission
      ? "Tout est prêt. Clique sur le grand bouton et laisse-toi guider."
      : "Une nouvelle étape de ton aventure t’attend sur la carte des mondes.";

  return (
    <main className={`dashboard-shell dashboard-shell--${props.tone}`}>
      <AdventurePrefetch hrefs={[
        adventureHref,
        `/mission/${props.childSlug}/village`,
        `/mission/${props.childSlug}/carte`,
        `/mission/${props.childSlug}/avatar`,
        props.collectionHref,
      ]} />
      <AchievementToast childSlug={props.childSlug} unlocked={props.achievementCollection.unlocked} />
      <TutorialOverlay childSlug={props.childSlug} page="dashboard" />
      <aside className="dashboard-sidebar">
        <Link href="/" className="dashboard-logo" aria-label="Retour à l'accueil">
          <MissionLogo compact />
        </Link>

        <Link className="dashboard-profile" href={`/mission/${props.childSlug}/avatar`} aria-label="Personnaliser mon avatar">
          <div className="dashboard-profile__avatar">{props.levelSymbol}</div>
          <div>
            <strong>{props.firstName}</strong>
            <span>{props.grade} · Niveau {props.level}</span>
          </div>
        </Link>

        <nav className="dashboard-nav" aria-label="Navigation du parcours">
          {navItems.map((item) => (
            <button
              type="button"
              className={item.active ? "is-active" : ""}
              key={item.label}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dashboard-sidebar__bottom">
          <button type="button">
            <Icon name="profile" />
            <span>Mon profil</span>
          </button>
          <Link href="/mission/settings">🎵 Ambiance & effets</Link>
          <Link href="/">Changer de parcours</Link>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="dashboard-mobile-menu" type="button" aria-label="Ouvrir le menu">
            <span /><span /><span />
          </button>
          <div className="dashboard-topbar__spacer" />
          <div className="dashboard-streak">
            <span><Icon name="flame" /></span>
            <div><strong>{props.streak} jours</strong><small>Série en cours</small></div>
          </div>
          <button className="dashboard-notification" type="button" aria-label="Notifications">
            <span />
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>
          </button>
        </header>

        <div className="dashboard-content">
          <section className="adventure-guide" aria-labelledby="adventure-guide-title">
            <div className="adventure-guide__copy">
              <span className="adventure-guide__eyebrow">{props.world.eyebrow} · {props.world.name}</span>
              <p className="adventure-guide__oscar">🦉 Oscar te guide</p>
              <h1 id="adventure-guide-title">{props.headline}</h1>
              <div className="adventure-guide__next">
                <small>Ta prochaine étape</small>
                <strong>{nextStepTitle}</strong>
                <p>{nextStepMessage}</p>
              </div>
              <div className="adventure-guide__actions">
                <Link className="adventure-guide__primary" href={adventureHref}>
                  <span>🚀 Continuer mon aventure</span>
                  <Icon name="arrow" />
                </Link>
                <span className="adventure-guide__duration"><Icon name="clock" /> Environ 20 minutes</span>
              </div>
            </div>
            <div className="adventure-guide__visual" aria-hidden="true">
              <span className="adventure-guide__orbit" />
              <span className="adventure-guide__moon" />
              <div><Icon name={props.tone === "ce2" ? "bolt" : "brain"} /></div>
            </div>
          </section>

          <nav className="adventure-shortcuts" aria-label="Explorer librement">
            <span className="adventure-shortcuts__label">Explorer librement</span>
            <Link href={`/mission/${props.childSlug}/village`}><span>🏡</span><strong>Village</strong><small>Parler aux héros</small></Link>
            <Link href={`/mission/${props.childSlug}/carte`}><span>🗺️</span><strong>Carte</strong><small>Voir les mondes</small></Link>
            <Link href={`/mission/${props.childSlug}/avatar`}><span>🧒</span><strong>Avatar</strong><small>Équiper mon héros</small></Link>
            <Link href={props.collectionHref}><span>🏆</span><strong>Succès</strong><small>Voir ma collection</small></Link>
          </nav>

          <WorldAtlas worlds={props.worldAtlas} totalXp={props.totalXp} firstName={props.firstName} />

          <div id="aventure-actuelle">
          <AdventureMap
            world={props.world}
            firstName={props.firstName}
            totalXp={props.totalXp}
            completedToday={completedToday}
            missionCount={props.missions.length}
            worldLevel={props.inventory.worldLevel}
          />
          </div>

          <AdventureInventory
            inventory={props.inventory}
            worldName={props.world.name}
            stageNames={props.world.stages.map((stage) => ({ id: stage.id, name: stage.name, symbol: stage.symbol }))}
          />

          <Link className="avatar-rpg-card" href={`/mission/${props.childSlug}/avatar`}>
            <div className="avatar-rpg-card__visual" aria-hidden="true"><span>🧒</span><i>🦉</i></div>
            <div><span>Nouvel espace RPG</span><h2>Crée ton héros</h2><p>Ouvre tes coffres, équipe tes tenues et choisis le compagnon qui t’accompagnera dans l’aventure.</p></div>
            <b>Mon avatar <Icon name="arrow" /></b>
          </Link>

          <ChildCooperationCard childSlug={props.childSlug} firstName={props.firstName} />

          <CollectionPreview collection={props.achievementCollection} href={props.collectionHref} />

          <section className={`adaptive-banner adaptive-banner--${props.adaptiveProfile.pace}`}>
            <div className="adaptive-banner__icon"><Icon name="brain" /></div>
            <div>
              <span>Le professeur invisible</span>
              <h2>Ton parcours s’adapte à toi</h2>
              <p>{props.adaptiveProfile.message}</p>
            </div>
            <div className="adaptive-banner__meta">
              <strong>{props.adaptiveProfile.pace === "gentle" ? "Rythme guidé" : props.adaptiveProfile.pace === "challenge" ? "Mode défi" : "Rythme équilibré"}</strong>
              <small>Difficulté cible {props.adaptiveProfile.targetDifficulty}/5</small>
              {props.adaptiveProfile.revisionSkillIds.length ? <em>{props.adaptiveProfile.revisionSkillIds.length} révision{props.adaptiveProfile.revisionSkillIds.length > 1 ? "s" : ""} planifiée{props.adaptiveProfile.revisionSkillIds.length > 1 ? "s" : ""}</em> : <em>Progression fluide</em>}
            </div>
          </section>

          <section className="dashboard-kpis" aria-label="Progression rapide">
            <article>
              <span className="kpi-icon"><Icon name="star" /></span>
              <div><small>Niveau actuel</small><strong>Niveau {props.level}</strong></div>
              <span className="kpi-tag">{props.totalXp} XP au total</span>
            </article>
            <article>
              <span className="kpi-icon"><Icon name="chart" /></span>
              <div><small>Semaine réussie</small><strong>{props.weeklyProgress} %</strong></div>
              <div className="mini-progress"><span style={{ width: `${props.weeklyProgress}%` }} /></div>
            </article>
            <article>
              <span className="kpi-icon"><Icon name="brain" /></span>
              <div><small>{props.focusLabel}</small><strong>{props.focusValue}</strong></div>
              <span className="kpi-tag kpi-tag--soft">À renforcer</span>
            </article>
          </section>

          <div className="dashboard-columns">
            <section className="daily-missions">
              <div className="section-heading">
                <div><span>Quêtes du jour</span><h2>La suite de ton aventure</h2><small className="section-heading__meta">{props.programLabel}</small></div>
                <button type="button">Voir toutes les quêtes <Icon name="arrow" /></button>
              </div>

              <Link className="nova-dashboard-card" href={props.novaHref}>
                <span>✦ Nova</span>
                <div><strong>Demander une nouvelle aventure à Nova</strong><small>Nova invente l’histoire, ton parcours choisit ce qui t’aide à progresser.</small></div>
                <Icon name="arrow" />
              </Link>

              <div className="mission-list">
                {props.missions.map((mission, index) => (
                  <article className={`mission-item mission-item--${mission.color} ${mission.status === "locked" ? "is-locked" : ""}`} key={mission.title}>
                    <div className="mission-item__number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="mission-item__icon"><Icon name={mission.status === "locked" ? "lock" : mission.icon} /></div>
                    <div className="mission-item__copy">
                      <span>{mission.location} · {mission.skillPath.join(" › ")}</span>
                      <em className="mission-item__reason">{mission.recommendation}</em>
                      <h3>{mission.title}</h3>
                      <p><Icon name="clock" /> {mission.duration} <i /> +{mission.xp} XP <i /> Niveau {mission.difficulty}</p>
                      <small className="mission-item__objective">{mission.objective}</small>
                    </div>
                    {mission.status === "ready" && mission.href ? (
                      <Link href={mission.href} aria-label={`Ouvrir ${mission.title}`}>
                        Commencer <Icon name="arrow" />
                      </Link>
                    ) : (
                      <button type="button" aria-label={`Ouvrir ${mission.title}`} disabled={mission.status === "locked"}>
                        {mission.status === "done" ? "Terminé aujourd’hui" : mission.status === "locked" ? "Bientôt" : "Commencer"}
                        <Icon name="arrow" />
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <aside className="dashboard-right-column">
              <section className="xp-card">
                <div className="xp-card__top">
                  <div><span>{props.levelSymbol} {props.levelTitle}</span><h2>Niveau {props.level} · vers le niveau {props.level + 1}</h2></div>
                  <strong>{xpPercent}%</strong>
                </div>
                <div className="xp-card__bar"><span style={{ width: `${xpPercent}%` }} /></div>
                <p><strong>{props.xp} XP</strong> sur {props.nextLevelXp} XP <span>· {props.levelReward}</span></p>
              </section>

              <section className="skills-card">
                <div className="section-heading section-heading--compact">
                  <div><span>Compétences</span><h2>Mes forces</h2></div>
                </div>
                <div className="skills-list">
                  {props.skills.map((skill) => (
                    <div key={skill.label}>
                      <p><span>{skill.label}</span><strong>{skill.value}%</strong></p>
                      <div><span style={{ width: `${skill.value}%` }} /></div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="reward-card">
                <div className="reward-card__badge"><span aria-hidden="true">{props.inventory.treasures.find((item) => !item.unlocked)?.symbol ?? "🏆"}</span></div>
                <div>
                  <span>{props.inventory.treasures.every((item) => item.unlocked) ? "Chapitre complété" : "Prochain trésor"}</span>
                  <h3>{props.inventory.treasures.find((item) => !item.unlocked)?.name ?? props.inventory.relics[0]?.name}</h3>
                  <p>{props.inventory.treasures.find((item) => !item.unlocked) ? "Continue les quêtes du lieu pour le révéler" : "Tous les trésors du chapitre sont réunis"}</p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
