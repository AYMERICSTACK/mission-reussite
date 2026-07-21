import { learningMissions } from "@/lib/content/missions";
import { analyzeLearningDiagnostics } from "@/lib/pedagogy/learning-diagnostics";
import { buildKnowledgeGraphMastery, getKnowledgeNode, getKnowledgeNodesForChild, resolveAttemptSkillId } from "@/lib/pedagogy/knowledge-graph";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";

export type LearningPlanAction = {
  id: string;
  skillId: string;
  label: string;
  subject: string;
  kind: "consolidate" | "practice" | "discover";
  title: string;
  objective: string;
  parentTip: string;
  successCriterion: string;
  sessions: number;
  minutesPerSession: number;
  missionId?: string;
  missionSlug?: string;
  completedSessions: number;
  progressPercent: number;
  status: "not-started" | "in-progress" | "completed";
  resultLabel: string;
};

export type WeeklyLearningPlan = {
  headline: string;
  summary: string;
  actions: LearningPlanAction[];
  totalMinutes: number;
  confidence: number;
  weekLabel: string;
  completedActions: number;
  totalActions: number;
  completionPercent: number;
  isCompleted: boolean;
};

function parisDateKey(date: Date) {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getParisWeek(date = new Date()) {
  const todayKey = parisDateKey(date);
  const [year, month, day] = todayKey.split("-").map(Number);
  const cursor = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = cursor.getUTCDay() || 7;
  cursor.setUTCDate(cursor.getUTCDate() - dayOfWeek + 1);
  const start = cursor.toISOString().slice(0, 10);
  cursor.setUTCDate(cursor.getUTCDate() + 6);
  const end = cursor.toISOString().slice(0, 10);
  const formatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
  return { start, end, label: `${formatter.format(new Date(`${start}T12:00:00Z`))} – ${formatter.format(new Date(`${end}T12:00:00Z`))}` };
}

function evaluateActionProgress(kind: LearningPlanAction["kind"], sessions: number, attempts: AttemptRecord[]) {
  const ordered = [...attempts].sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  const completedSessions = Math.min(ordered.length, sessions);
  const average = ordered.length
    ? Math.round(ordered.reduce((sum, attempt) => sum + (attempt.correctAnswers / Math.max(attempt.totalQuestions, 1)) * 100, 0) / ordered.length)
    : 0;
  const lastTwo = ordered.slice(-2);
  const completed = kind === "discover"
    ? ordered.length >= 1
    : kind === "consolidate"
      ? lastTwo.length >= 2 && lastTwo.every((attempt) => attempt.hintsUsed <= 1 && attempt.correctAnswers / Math.max(attempt.totalQuestions, 1) >= 0.7)
      : ordered.length >= sessions && average >= 70;
  const sessionProgress = Math.min(100, Math.round((ordered.length / Math.max(sessions, 1)) * 100));
  const progressPercent = completed ? 100 : Math.round(sessionProgress * 0.7 + average * 0.3);
  const status = completed ? "completed" : ordered.length ? "in-progress" : "not-started";
  const resultLabel = completed
    ? "Objectif atteint"
    : ordered.length
      ? `${ordered.length}/${sessions} séance${sessions > 1 ? "s" : ""} · ${average}% de réussite`
      : "À commencer";
  return { completedSessions, progressPercent, status, resultLabel } as const;
}

function parentTipFor(kind: LearningPlanAction["kind"], label: string) {
  if (kind === "consolidate") return `Laisser l’enfant expliquer sa stratégie sur « ${label} », puis poser une seule question : « Comment peux-tu vérifier ? »`;
  if (kind === "practice") return "Privilégier une séance courte et régulière. Féliciter la méthode utilisée avant de parler du résultat.";
  return "Présenter cette nouvelle notion comme un défi à explorer, sans chercher la perfection dès la première tentative.";
}

function successCriterion(kind: LearningPlanAction["kind"], label: string) {
  if (kind === "consolidate") return `Réussir deux missions consécutives sur « ${label} » avec au plus un indice.`;
  if (kind === "practice") return "Maintenir au moins 70 % de réussite sur deux séances courtes.";
  return "Terminer une première mission et pouvoir expliquer ce qui a été découvert.";
}

export function buildWeeklyLearningPlan(child: ChildKey, attempts: AttemptRecord[], date = new Date()): WeeklyLearningPlan {
  const week = getParisWeek(date);
  const childAttempts = attempts.filter((attempt) => attempt.child === child);
  const baselineAttempts = childAttempts.filter((attempt) => parisDateKey(new Date(attempt.completedAt)) < week.start);
  const weeklyAttempts = childAttempts.filter((attempt) => {
    const key = parisDateKey(new Date(attempt.completedAt));
    return key >= week.start && key <= week.end;
  });
  const diagnostic = analyzeLearningDiagnostics(child, baselineAttempts);
  const profiles = buildKnowledgeGraphMastery(baselineAttempts);
  const profilesById = new Map(profiles.map((profile) => [profile.skillId, profile]));
  const nodes = getKnowledgeNodesForChild(child);
  const chosen = new Set<string>();
  const priorities: Array<{ skillId: string; kind: LearningPlanAction["kind"] }> = [];

  diagnostic.blockages.forEach((blockage) => {
    if (!chosen.has(blockage.skillId) && priorities.length < 2) {
      priorities.push({ skillId: blockage.skillId, kind: "consolidate" });
      chosen.add(blockage.skillId);
    }
  });

  const progressing = profiles
    .filter((profile) => !chosen.has(profile.skillId) && profile.status === "progressing")
    .sort((a, b) => a.value - b.value || b.confidence - a.confidence)[0];
  if (progressing) {
    priorities.push({ skillId: progressing.skillId, kind: "practice" });
    chosen.add(progressing.skillId);
  }

  const readyUnseen = nodes.find((node) => {
    if (chosen.has(node.id) || profilesById.has(node.id)) return false;
    return node.prerequisites.every((id) => profilesById.get(id)?.status === "mastered");
  }) ?? nodes.find((node) => !chosen.has(node.id) && !profilesById.has(node.id) && node.prerequisites.length === 0);
  if (readyUnseen && priorities.length < 3) {
    priorities.push({ skillId: readyUnseen.id, kind: "discover" });
    chosen.add(readyUnseen.id);
  }

  for (const node of nodes) {
    if (priorities.length >= 3) break;
    if (chosen.has(node.id)) continue;
    const profile = profilesById.get(node.id);
    priorities.push({ skillId: node.id, kind: profile ? "practice" : "discover" });
    chosen.add(node.id);
  }

  const actions = priorities.slice(0, 3).flatMap(({ skillId, kind }, index) => {
    const node = getKnowledgeNode(skillId);
    if (!node) return [];
    const mission = learningMissions
      .filter((item) => item.child === child && item.skillId === skillId)
      .sort((a, b) => a.difficulty - b.difficulty)[0];
    const sessions = kind === "consolidate" ? 2 : 1;
    const minutesPerSession = Number.parseInt(mission?.duration ?? "10", 10) || 10;
    const actionAttempts = weeklyAttempts.filter((attempt) => resolveAttemptSkillId(attempt) === skillId);
    const progress = evaluateActionProgress(kind, sessions, actionAttempts);
    return [{
      id: `${child}-${week.start}-${skillId}-${index}`,
      skillId,
      label: node.label,
      subject: node.subject,
      kind,
      title: kind === "consolidate" ? `Consolider ${node.label}` : kind === "practice" ? `Stabiliser ${node.label}` : `Découvrir ${node.label}`,
      objective: mission?.objective ?? node.description,
      parentTip: parentTipFor(kind, node.label),
      successCriterion: successCriterion(kind, node.label),
      sessions,
      minutesPerSession,
      missionId: mission?.id,
      missionSlug: mission?.slug,
      ...progress,
    }];
  });

  const totalMinutes = actions.reduce((sum, action) => sum + action.sessions * action.minutesPerSession, 0);
  const priority = actions[0];
  const headline = priority ? `Priorité : ${priority.label}` : "Poursuivre les missions quotidiennes";
  const summary = diagnostic.blockages.length
    ? "Le plan commence par la cause la plus probable du blocage, puis maintient une compétence en progression et ouvre une nouvelle étape lorsque les prérequis le permettent."
    : "Le plan entretient les acquis tout en introduisant progressivement une nouvelle notion, sans augmenter inutilement la durée des séances.";

  const completedActions = actions.filter((action) => action.status === "completed").length;
  const totalActions = actions.length;
  const completionPercent = totalActions
    ? Math.round(actions.reduce((sum, action) => sum + action.progressPercent, 0) / totalActions)
    : 0;

  return {
    headline,
    summary,
    actions,
    totalMinutes,
    confidence: diagnostic.confidence,
    weekLabel: week.label,
    completedActions,
    totalActions,
    completionPercent,
    isCompleted: totalActions > 0 && completedActions === totalActions,
  };
}

export function getLearningPlanPrioritySkillIds(child: ChildKey, attempts: AttemptRecord[]) {
  return new Set(buildWeeklyLearningPlan(child, attempts).actions.map((action) => action.skillId));
}
