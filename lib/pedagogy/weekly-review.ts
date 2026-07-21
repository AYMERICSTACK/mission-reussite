import { buildKnowledgeGraphMastery, getKnowledgeNode, resolveAttemptSkillId } from "@/lib/pedagogy/knowledge-graph";
import { buildWeeklyLearningPlan } from "@/lib/pedagogy/learning-plan";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";

export type WeeklyReviewHighlight = {
  skillId: string;
  label: string;
  detail: string;
  value: number;
  delta: number;
  kind: "progress" | "strength" | "attention";
};

export type WeeklyLearningReview = {
  weekLabel: string;
  headline: string;
  summary: string;
  missionsCompleted: number;
  activeDays: number;
  minutes: number;
  xp: number;
  successRate: number;
  planCompletion: number;
  highlights: WeeklyReviewHighlight[];
  nextPriority?: {
    skillId: string;
    label: string;
    reason: string;
  };
  parentMessage: string;
  hasActivity: boolean;
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

export function buildWeeklyLearningReview(child: ChildKey, attempts: AttemptRecord[], date = new Date()): WeeklyLearningReview {
  const week = getParisWeek(date);
  const childAttempts = attempts.filter((attempt) => attempt.child === child);
  const baselineAttempts = childAttempts.filter((attempt) => parisDateKey(new Date(attempt.completedAt)) < week.start);
  const weeklyAttempts = childAttempts.filter((attempt) => {
    const key = parisDateKey(new Date(attempt.completedAt));
    return key >= week.start && key <= week.end;
  });
  const plan = buildWeeklyLearningPlan(child, childAttempts, date);
  const baseline = new Map(buildKnowledgeGraphMastery(baselineAttempts).map((skill) => [skill.skillId, skill]));
  const current = buildKnowledgeGraphMastery([...baselineAttempts, ...weeklyAttempts]);
  const weeklyBySkill = new Map<string, AttemptRecord[]>();

  weeklyAttempts.forEach((attempt) => {
    const skillId = resolveAttemptSkillId(attempt);
    if (!skillId) return;
    weeklyBySkill.set(skillId, [...(weeklyBySkill.get(skillId) ?? []), attempt]);
  });

  const highlights: WeeklyReviewHighlight[] = current
    .flatMap((skill) => {
      const weekAttempts = weeklyBySkill.get(skill.skillId) ?? [];
      if (!weekAttempts.length) return [];
      const before = baseline.get(skill.skillId)?.value ?? 0;
      const delta = skill.value - before;
      const kind: WeeklyReviewHighlight["kind"] = skill.status === "mastered"
        ? "strength"
        : delta >= 5 || skill.trend === "up"
          ? "progress"
          : skill.status === "fragile" || skill.trend === "down"
            ? "attention"
            : "progress";
      const detail = kind === "strength"
        ? "Compétence désormais solide et régulière."
        : kind === "attention"
          ? "Les résultats restent irréguliers : une courte consolidation est préférable."
          : delta > 0
            ? `Progression de ${delta} point${delta > 1 ? "s" : ""} cette semaine.`
            : "La compétence a été travaillée avec régularité cette semaine.";
      return [{ skillId: skill.skillId, label: skill.label, detail, value: skill.value, delta, kind }];
    })
    .sort((a, b) => {
      const order = { progress: 0, strength: 1, attention: 2 } as const;
      return order[a.kind] - order[b.kind] || b.delta - a.delta || b.value - a.value;
    })
    .slice(0, 3);

  const missionsCompleted = weeklyAttempts.length;
  const activeDays = new Set(weeklyAttempts.map((attempt) => parisDateKey(new Date(attempt.completedAt)))).size;
  const minutes = Math.round(weeklyAttempts.reduce((sum, attempt) => sum + attempt.durationSeconds, 0) / 60);
  const xp = weeklyAttempts.reduce((sum, attempt) => sum + attempt.xp, 0);
  const answers = weeklyAttempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const correct = weeklyAttempts.reduce((sum, attempt) => sum + attempt.correctAnswers, 0);
  const successRate = answers ? Math.round((correct / answers) * 100) : 0;
  const attention = highlights.find((item) => item.kind === "attention");
  const nextAction = plan.actions.find((action) => action.status !== "completed") ?? plan.actions[0];
  const nextNode = nextAction ? getKnowledgeNode(nextAction.skillId) : undefined;

  const hasActivity = missionsCompleted > 0;
  const headline = !hasActivity
    ? "La semaine peut encore commencer en douceur"
    : plan.isCompleted
      ? "Les objectifs de la semaine sont atteints"
      : activeDays >= 3
        ? "Une semaine régulière et bien engagée"
        : "Des progrès sont déjà visibles";
  const summary = !hasActivity
    ? "Aucune mission n’a encore été terminée cette semaine. Une première séance courte suffit pour lancer le suivi."
    : `${missionsCompleted} mission${missionsCompleted > 1 ? "s" : ""} réalisée${missionsCompleted > 1 ? "s" : ""} sur ${activeDays} jour${activeDays > 1 ? "s" : ""}, avec ${successRate}% de réussite. ${plan.isCompleted ? "Le plan hebdomadaire est validé." : `Le plan est avancé à ${plan.completionPercent}%.`}`;
  const parentMessage = !hasActivity
    ? "Privilégiez une première séance de 10 minutes, sans objectif de perfection. L’important est de reprendre le rythme."
    : attention
      ? `La priorité reste « ${attention.label} ». Une séance courte avec verbalisation de la méthode sera plus utile qu’une longue série d’exercices.`
      : plan.isCompleted
        ? "Les objectifs ont été atteints : valorisez la régularité et laissez une journée légère avant d’ouvrir une nouvelle difficulté."
        : "La dynamique est positive. Gardez des séances courtes et régulières plutôt que d’essayer de tout terminer en une fois.";

  return {
    weekLabel: week.label,
    headline,
    summary,
    missionsCompleted,
    activeDays,
    minutes,
    xp,
    successRate,
    planCompletion: plan.completionPercent,
    highlights,
    nextPriority: nextAction ? {
      skillId: nextAction.skillId,
      label: nextNode?.label ?? nextAction.label,
      reason: nextAction.status === "in-progress"
        ? "Cette compétence est déjà engagée : la prochaine mission permettra de stabiliser les acquis."
        : nextAction.kind === "consolidate"
          ? "Le moteur recommande de sécuriser ce prérequis avant de poursuivre le parcours."
          : "C’est la prochaine étape cohérente du plan pédagogique de la semaine.",
    } : undefined,
    parentMessage,
    hasActivity,
  };
}
