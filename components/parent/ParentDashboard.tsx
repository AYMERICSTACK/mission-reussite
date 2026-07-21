"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MissionLogo } from "@/components/brand/MissionLogo";
import { buildSummary, readAttempts } from "@/lib/progress/local-progress";
import { fetchProgress } from "@/lib/progress/remote-progress";
import { getKnowledgeNodesForChild, type KnowledgeSubject } from "@/lib/pedagogy/knowledge-graph";
import { analyzeLearningDiagnostics } from "@/lib/pedagogy/learning-diagnostics";
import { buildWeeklyLearningPlan } from "@/lib/pedagogy/learning-plan";
import { buildWeeklyLearningReview } from "@/lib/pedagogy/weekly-review";
import type { AttemptRecord, ChildKey, ChildProgressSummary } from "@/lib/progress/types";

const children: ChildKey[] = ["alyssio", "leony"];

const statusLabels = {
  discovery: "Découverte",
  fragile: "À renforcer",
  progressing: "En progression",
  mastered: "Maîtrisée",
} as const;

const trendLabels = {
  up: "↗ En hausse",
  stable: "→ Stable",
  down: "↘ À surveiller",
} as const;

function adviceFor(summary: ChildProgressSummary) {
  if (!summary.completedMissions) return "Aucune mission terminée pour le moment. Les premières données apparaîtront ici dès qu’un parcours sera achevé.";
  const weakest = summary.skills[0];
  if (!weakest) return "Les premières missions sont enregistrées. Continuez encore quelques séances pour obtenir une analyse plus précise.";
  if (weakest.status === "discovery") return `${summary.firstName} découvre encore « ${weakest.label} ». Deux ou trois missions supplémentaires permettront d’obtenir une mesure plus fiable.`;
  if (weakest.status === "fragile") return `${summary.firstName} a surtout besoin de consolider « ${weakest.label} ». Privilégiez une séance courte, guidée, avec reformulation avant chaque réponse.`;
  if (weakest.trend === "down") return `La compétence « ${weakest.label} » montre une légère baisse récente. Une révision simple est préférable avant d’augmenter la difficulté.`;
  if (summary.hintsUsed > summary.completedMissions) return `${summary.firstName} progresse, mais utilise encore régulièrement les indices. L’objectif suivant sera de laisser quelques secondes de réflexion supplémentaire avant de demander de l’aide.`;
  return `${summary.firstName} avance de manière régulière. La prochaine étape peut augmenter légèrement la difficulté tout en conservant des séances courtes.`;
}

export function ParentDashboard() {
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [remoteSummaries, setRemoteSummaries] = useState<Record<ChildKey, ChildProgressSummary> | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildKey>("alyssio");
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");

  const refresh = useCallback(async () => {
    try {
      const data = await fetchProgress();
      setAttempts(data.attempts);
      setRemoteSummaries(data.summaries);
      setStatus("online");
    } catch (error) {
      console.error(error);
      setAttempts(readAttempts());
      setRemoteSummaries(null);
      setStatus("offline");
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const onProgress = () => void refresh();
    window.addEventListener("storage", onProgress);
    window.addEventListener("mission-progress-updated", onProgress);
    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener("storage", onProgress);
      window.removeEventListener("mission-progress-updated", onProgress);
    };
  }, [refresh]);

  const localSummaries = useMemo(
    () => Object.fromEntries(children.map((child) => [child, buildSummary(child, attempts)])) as Record<ChildKey, ChildProgressSummary>,
    [attempts],
  );
  const summaries = remoteSummaries ?? localSummaries;
  const summary = summaries[selectedChild] ?? localSummaries[selectedChild];
  const childAttempts = useMemo(() => attempts.filter((attempt) => attempt.child === selectedChild), [attempts, selectedChild]);
  const recentAttempts = childAttempts.slice(0, 5);
  const diagnostic = useMemo(() => analyzeLearningDiagnostics(selectedChild, childAttempts), [selectedChild, childAttempts]);
  const learningPlan = useMemo(() => buildWeeklyLearningPlan(selectedChild, childAttempts), [selectedChild, childAttempts]);
  const weeklyReview = useMemo(() => buildWeeklyLearningReview(selectedChild, childAttempts), [selectedChild, childAttempts]);
  const knowledgeMap = useMemo(() => {
    const observed = new Map(summary.skills.map((skill) => [skill.skillId, skill]));
    const grouped = new Map<KnowledgeSubject, Array<{ node: ReturnType<typeof getKnowledgeNodesForChild>[number]; skill?: ChildProgressSummary["skills"][number] }>>();
    getKnowledgeNodesForChild(selectedChild).forEach((node) => {
      grouped.set(node.subject, [...(grouped.get(node.subject) ?? []), { node, skill: observed.get(node.id) }]);
    });
    return [...grouped.entries()];
  }, [selectedChild, summary.skills]);
  const masteredCount = summary.skills.filter((skill) => skill.status === "mastered").length;

  return (
    <main className="parent-shell">
      <header className="parent-topbar">
        <Link href="/" aria-label="Retour à l’accueil"><MissionLogo compact /></Link>
        <div><span>Espace parents</span><strong>Suivi des apprentissages</strong></div>
        <Link href="/">Retour aux parcours</Link>
      </header>

      <section className="parent-content">
        <div className="parent-hero">
          <div>
            <span>Tableau de bord familial</span>
            <h1>Des progrès concrets, sans pression.</h1>
            <p>{status === "online" ? "Les résultats sont enregistrés dans votre base Neon et disponibles sur tous vos appareils." : status === "loading" ? "Connexion à la progression en cours…" : "Neon est momentanément indisponible : les résultats de cet appareil restent visibles."}</p>
          </div>
          <div className="parent-hero__badge">{status === "online" ? "NEON ✓" : status === "loading" ? "…" : "LOCAL"}</div>
        </div>

        <div className="parent-tabs" role="tablist" aria-label="Choisir un enfant">
          {children.map((child) => (
            <button key={child} type="button" className={selectedChild === child ? "is-active" : ""} onClick={() => setSelectedChild(child)}>
              <span>{summaries[child]?.firstName.slice(0, 1)}</span>
              <div><strong>{summaries[child]?.firstName}</strong><small>{summaries[child]?.grade}</small></div>
            </button>
          ))}
        </div>

        <section className="parent-kpis">
          <article><span>Missions terminées</span><strong>{summary.completedMissions}</strong><small>{status === "online" ? "sauvegardées dans Neon" : "sur cet appareil"}</small></article>
          <article><span>Réussite globale</span><strong>{summary.successRate}%</strong><small>réponses validées</small></article>
          <article><span>Temps de travail</span><strong>{summary.totalMinutes} min</strong><small>temps cumulé</small></article>
          <article><span>XP gagnés</span><strong>{summary.totalXp}</strong><small>progression réelle</small></article>
        </section>

        <div className="parent-grid">
          <section className="parent-card parent-card--diagnostic">
            <div className="parent-card__heading parent-card__heading--split">
              <div><span>Analyse pédagogique</span><h2>Diagnostic des apprentissages</h2></div>
              <strong>Fiabilité {diagnostic.confidence}%</strong>
            </div>
            <p className="diagnostic-intro">Le moteur relie les résultats aux prérequis pour distinguer une difficulté ponctuelle d’un véritable blocage.</p>
            {diagnostic.blockages.length ? (
              <div className="diagnostic-grid">
                {diagnostic.blockages.map((blockage) => (
                  <article className={`diagnostic-block diagnostic-block--${blockage.severity}`} key={blockage.id}>
                    <div className="diagnostic-block__top">
                      <span>{blockage.severity === "priority" ? "Priorité" : blockage.severity === "attention" ? "À consolider" : "À surveiller"}</span>
                      <strong>{blockage.confidence}% fiable</strong>
                    </div>
                    <h3>{blockage.title}</h3>
                    <p>{blockage.detail}</p>
                    <small>{blockage.evidence}</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="diagnostic-empty">
                <strong>{summary.completedMissions ? "Aucun blocage confirmé" : "Analyse en préparation"}</strong>
                <p>{summary.completedMissions ? "Les résultats observés sont cohérents. Le moteur continuera à vérifier la régularité au fil des missions." : "Il faut encore quelques missions pour produire un diagnostic suffisamment fiable."}</p>
              </div>
            )}
            <div className="diagnostic-summary">
              <div>
                <span>Prochaine étape recommandée</span>
                <strong>{diagnostic.nextStep?.label ?? "Poursuivre les missions de découverte"}</strong>
                <p>{diagnostic.nextStep?.reason ?? diagnostic.recommendation}</p>
              </div>
              <div className="diagnostic-strengths">
                <span>Points forts</span>
                {diagnostic.strengths.length ? diagnostic.strengths.map((strength) => <p key={strength.skillId}><strong>{strength.label}</strong><small>{strength.detail}</small></p>) : <p><strong>Encore en observation</strong><small>Les points forts apparaîtront après plusieurs missions.</small></p>}
              </div>
            </div>
          </section>

          <section className="parent-card parent-card--weekly-review">
            <div className="parent-card__heading parent-card__heading--split">
              <div><span>Bilan intelligent</span><h2>Cette semaine en un coup d’œil</h2></div>
              <strong>{weeklyReview.weekLabel}</strong>
            </div>
            <div className="weekly-review__hero">
              <div>
                <span>{weeklyReview.hasActivity ? "Bilan actualisé" : "Semaine à démarrer"}</span>
                <h3>{weeklyReview.headline}</h3>
                <p>{weeklyReview.summary}</p>
              </div>
              <div className="weekly-review__score">
                <strong>{weeklyReview.planCompletion}%</strong>
                <span>du plan réalisé</span>
              </div>
            </div>
            <div className="weekly-review__metrics">
              <article><strong>{weeklyReview.missionsCompleted}</strong><span>Missions</span></article>
              <article><strong>{weeklyReview.activeDays}</strong><span>Jours actifs</span></article>
              <article><strong>{weeklyReview.successRate}%</strong><span>Réussite</span></article>
              <article><strong>{weeklyReview.minutes} min</strong><span>Temps</span></article>
              <article><strong>+{weeklyReview.xp}</strong><span>XP</span></article>
            </div>
            {weeklyReview.highlights.length ? (
              <div className="weekly-review__highlights">
                {weeklyReview.highlights.map((highlight) => (
                  <article className={`weekly-review-highlight weekly-review-highlight--${highlight.kind}`} key={highlight.skillId}>
                    <div><span>{highlight.kind === "strength" ? "Point fort" : highlight.kind === "attention" ? "À consolider" : "Progrès"}</span><strong>{highlight.value}%</strong></div>
                    <h3>{highlight.label}</h3>
                    <p>{highlight.detail}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="weekly-review__empty">Les progrès détaillés apparaîtront dès la première mission terminée cette semaine.</div>
            )}
            <div className="weekly-review__footer">
              <div><span>Priorité suivante</span><strong>{weeklyReview.nextPriority?.label ?? "Lancer une première mission"}</strong><p>{weeklyReview.nextPriority?.reason ?? "Le moteur préparera la prochaine étape dès qu’une activité aura été enregistrée."}</p></div>
              <div><span>Conseil aux parents</span><p>{weeklyReview.parentMessage}</p></div>
            </div>
          </section>

          <section className="parent-card parent-card--learning-plan">
            <div className="parent-card__heading parent-card__heading--split">
              <div><span>Plan pédagogique</span><h2>Plan de la semaine</h2></div>
              <strong>{learningPlan.totalMinutes} min au total</strong>
            </div>
            <div className="learning-plan__intro">
              <div><strong>{learningPlan.headline}</strong><p>{learningPlan.summary}</p></div>
              <span>Fiabilité {learningPlan.confidence}%</span>
            </div>
            <div className={`learning-plan-progress ${learningPlan.isCompleted ? "is-complete" : ""}`}>
              <div className="learning-plan-progress__top">
                <div>
                  <span>Semaine du {learningPlan.weekLabel}</span>
                  <strong>{learningPlan.isCompleted ? "Plan de la semaine validé" : `${learningPlan.completedActions}/${learningPlan.totalActions} objectifs atteints`}</strong>
                </div>
                <strong>{learningPlan.completionPercent}%</strong>
              </div>
              <div className="learning-plan-progress__bar"><span style={{ width: `${learningPlan.completionPercent}%` }} /></div>
              <p>{learningPlan.isCompleted ? "Bravo : les trois objectifs pédagogiques ont été atteints cette semaine." : "Les objectifs restent identiques jusqu’à dimanche. Chaque mission réalisée met automatiquement ce suivi à jour."}</p>
            </div>
            <div className="learning-plan__actions">
              {learningPlan.actions.map((action, index) => (
                <article className={`learning-plan-action learning-plan-action--${action.kind} learning-plan-action--${action.status}`} key={action.id}>
                  <div className="learning-plan-action__number">{action.status === "completed" ? "✓" : index + 1}</div>
                  <div className="learning-plan-action__top"><span>{action.subject}</span><strong>{action.sessions} séance{action.sessions > 1 ? "s" : ""} · {action.minutesPerSession} min</strong></div>
                  <h3>{action.title}</h3>
                  <p>{action.objective}</p>
                  <div className="learning-plan-action__tracking">
                    <div><span>Progression</span><strong>{action.resultLabel}</strong></div>
                    <span>{action.progressPercent}%</span>
                  </div>
                  <div className="learning-plan-action__bar"><span style={{ width: `${action.progressPercent}%` }} /></div>
                  <div className="learning-plan-action__detail"><span>Comment accompagner</span><p>{action.parentTip}</p></div>
                  <div className="learning-plan-action__success"><span>Objectif observable</span><strong>{action.successCriterion}</strong></div>
                </article>
              ))}
            </div>
          </section>

          <section className="parent-card parent-card--skills parent-card--knowledge">
            <div className="parent-card__heading parent-card__heading--split"><div><span>Knowledge Graph</span><h2>Carte des compétences</h2></div><strong>{masteredCount}/{getKnowledgeNodesForChild(selectedChild).length} maîtrisées</strong></div>
            <p className="knowledge-intro">Chaque notion est reliée à ses prérequis et à l’étape suivante. Une réussite isolée ne suffit pas à valider tout un domaine.</p>
            <div className="knowledge-subjects">
              {knowledgeMap.map(([subject, items]) => (
                <section className="knowledge-subject" key={subject}>
                  <div className="knowledge-subject__heading"><strong>{subject}</strong><span>{items.filter((item) => item.skill?.status === "mastered").length}/{items.length}</span></div>
                  <div className="knowledge-nodes">
                    {items.map(({ node, skill }) => (
                      <article className={`knowledge-node knowledge-node--${skill?.status ?? "unseen"}`} key={node.id}>
                        <div className="knowledge-node__top"><div><small>{node.domain}</small><h3>{node.label}</h3></div><strong>{skill ? `${skill.value}%` : "—"}</strong></div>
                        <div className="knowledge-node__bar"><span style={{ width: `${skill?.value ?? 0}%` }} /></div>
                        <p>{node.description}</p>
                        <div className="knowledge-node__meta">
                          <span className={`parent-skill-status parent-skill-status--${skill?.status ?? "unseen"}`}>{skill ? statusLabels[skill.status] : "À découvrir"}</span>
                          {skill ? <span className={`parent-skill-trend parent-skill-trend--${skill.trend}`}>{trendLabels[skill.trend]}</span> : null}
                        </div>
                        {node.prerequisites.length ? <small className="knowledge-node__relation">Prérequis : {node.prerequisites.map((id) => getKnowledgeNodesForChild(selectedChild).find((item) => item.id === id)?.label ?? id).join(" · ")}</small> : <small className="knowledge-node__relation">Point d’entrée du parcours</small>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="parent-card parent-card--advice">
            <div className="parent-card__heading"><span>Recommandation</span><h2>Conseil de la semaine</h2></div>
            <p>{diagnostic.recommendation || adviceFor(summary)}</p>
            <div><strong>{summary.hintsUsed}</strong><span>indice{summary.hintsUsed > 1 ? "s" : ""} utilisé{summary.hintsUsed > 1 ? "s" : ""}</span></div>
          </section>

          <section className="parent-card parent-card--history">
            <div className="parent-card__heading"><span>Activité récente</span><h2>Dernières missions</h2></div>
            {recentAttempts.length ? <div className="parent-history-list">{recentAttempts.map((attempt) => <article key={attempt.id}><div><strong>{attempt.missionTitle}</strong><span>{attempt.category}</span></div><div><strong>{Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100)}%</strong><span>+{attempt.xp} XP</span></div></article>)}</div> : <p className="parent-empty">Aucune activité enregistrée pour le moment.</p>}
          </section>
        </div>
      </section>
    </main>
  );
}
