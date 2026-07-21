import Link from "next/link";
import type { NarrativeChapterProgress, NarrativeSeason } from "@/lib/narrative/types";
import type { CinematicScene } from "@/lib/cinematics/cinematics";
import { CinematicPlayer } from "@/components/cinematics/CinematicPlayer";

export function NarrativeChapter({ season, progress, childSlug, firstName, nextChapterSlug, cinematic }: { season: NarrativeSeason; progress: NarrativeChapterProgress; childSlug: string; firstName: string; nextChapterSlug?: string; cinematic?: CinematicScene }) {
  const currentMission = progress.missions.find((mission) => mission.status === "ready");
  return <><CinematicPlayer childSlug={childSlug} scene={cinematic} /><main className={`narrative-page ${progress.chapter.isBoss ? "narrative-page--boss" : ""}`}>
    <nav className="narrative-nav"><Link href={`/mission/${childSlug}`}>← Mon aventure</Link><span>Saison {season.number} · Chapitre {progress.chapter.number} sur {season.chapters.length}</span></nav>
    <header className="narrative-hero">
      <div><span>{progress.chapter.isBoss ? "⚔️ Combat de gardien · " : ""}{progress.chapter.symbol} {progress.chapter.location}</span><h1>{progress.chapter.title}</h1><p>{progress.chapter.subtitle}</p></div>
      <div className="narrative-progress"><strong>{progress.percent}%</strong><span><i style={{width:`${progress.percent}%`}} /></span><small>{progress.completedMissionCount}/{progress.totalMissionCount} missions</small></div>
    </header>
    <section className="narrative-season-path" aria-label="Progression dans la saison">
      {season.chapters.map((chapter) => <span key={chapter.id} className={chapter.number < progress.chapter.number ? "is-done" : chapter.number === progress.chapter.number ? "is-current" : ""}>{chapter.isBoss ? "👁️" : chapter.number}</span>)}
    </section>
    <section className="narrative-story-card"><span>Épisode en cours</span><h2>Oscar a besoin de toi, {firstName}</h2><p>{progress.chapter.summary}</p><div className="narrative-dialogues">{progress.chapter.opening.map((dialogue,index)=><blockquote key={`${dialogue.speaker}-${index}`}><strong>{dialogue.speaker}</strong><p>{dialogue.text}</p></blockquote>)}</div></section>
    <section className="narrative-missions"><div className="section-heading"><div><span>Parcours narratif</span><h2>{progress.chapter.isBoss ? (progress.chapter.number === season.chapters.length ? "Affronte le Seigneur de l’Ombre" : "Affronte le gardien") : "Fais avancer l’expédition"}</h2></div></div>{progress.missions.map((mission,index)=><article className={`narrative-mission narrative-mission--${mission.status}`} key={mission.id}><div className="narrative-mission__index">{mission.status==="done"?"✓":index+1}</div><div><span>{mission.status==="done"?"Mission réussie":mission.status==="ready"?"À toi de jouer":"Mission verrouillée"}</span><h3>{mission.title}</h3><p>{mission.objective}</p>{mission.intro[0]&&<small><strong>{mission.intro[0].speaker} :</strong> {mission.intro[0].text}</small>}</div>{mission.status==="ready"?<Link href={`/mission/${childSlug}/activite/${mission.activitySlug}?chapter=${progress.chapter.slug}`}>Commencer →</Link>:mission.status==="done"?<Link href={`/mission/${childSlug}/activite/${mission.activitySlug}?chapter=${progress.chapter.slug}`}>Rejouer</Link>:<span className="narrative-lock">🔒</span>}</article>)}</section>
    <aside className="narrative-reward"><span>{progress.chapter.reward.symbol}</span><div><small>Récompense du chapitre</small><h2>{progress.chapter.reward.label}</h2><p>{progress.chapter.reward.description}</p></div>{progress.completed?<strong>Débloquée !</strong>:<em>Encore {progress.totalMissionCount-progress.completedMissionCount} mission(s)</em>}</aside>
    {progress.completed && !progress.chapter.finale && <section className="narrative-completion"><span>Chapitre terminé</span><h2>{progress.chapter.isBoss ? "Le gardien est vaincu !" : "Un nouveau passage vient de s’ouvrir"}</h2>{progress.chapter.completionDialogue.map((dialogue,index)=><p key={`${dialogue.speaker}-${index}`}><strong>{dialogue.speaker} :</strong> {dialogue.text}</p>)}{nextChapterSlug?<Link href={`/mission/${childSlug}/chapitres/${nextChapterSlug}`}>Découvrir le chapitre suivant →</Link>:<Link href={`/mission/${childSlug}`}>Retourner à la carte des mondes →</Link>}</section>}
    {progress.completed && progress.chapter.finale && <section className="narrative-finale">
      <div className="narrative-finale__celebration"><span>🏆</span><small>Saison 1 terminée</small><h2>{progress.chapter.finale.title}</h2><p>{progress.chapter.finale.message}</p></div>
      <div className="narrative-finale__dialogues">{progress.chapter.completionDialogue.map((dialogue,index)=><p key={`${dialogue.speaker}-${index}`}><strong>{dialogue.speaker} :</strong> {dialogue.text}</p>)}</div>
      <div className="narrative-season-unlocked"><span>⏳</span><div><small>Nouvelle saison débloquée</small><h3>{progress.chapter.finale.seasonTwoTitle}</h3><p>{progress.chapter.finale.seasonTwoMessage}</p></div><strong>À venir</strong></div>
      <Link href={`/mission/${childSlug}`}>Retourner à la carte des mondes →</Link>
    </section>}
    {currentMission&&<Link className="narrative-sticky-cta" href={`/mission/${childSlug}/activite/${currentMission.activitySlug}?chapter=${progress.chapter.slug}`}>Continuer le chapitre · {currentMission.title}</Link>}
  </main></>;
}
