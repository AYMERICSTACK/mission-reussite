import type { AttemptRecord } from "@/lib/progress/types";

export type SkillMasteryStatus = "discovery" | "fragile" | "progressing" | "mastered";
export type SkillTrend = "up" | "stable" | "down";

export type SkillMastery = {
  label: string;
  value: number;
  attempts: number;
  confidence: number;
  status: SkillMasteryStatus;
  trend: SkillTrend;
  lastPracticedAt: string;
};

type AttemptScore = {
  accuracy: number;
  completedAt: string;
};

function accuracy(attempt: AttemptRecord) {
  return attempt.totalQuestions > 0 ? (attempt.correctAnswers / attempt.totalQuestions) * 100 : 0;
}

function weightedAverage(scores: AttemptScore[]) {
  if (!scores.length) return 0;

  let weightedTotal = 0;
  let totalWeight = 0;

  scores.forEach((score, index) => {
    // Recent attempts matter more while older results still keep useful context.
    const weight = Math.max(1, scores.length - index);
    weightedTotal += score.accuracy * weight;
    totalWeight += weight;
  });

  return weightedTotal / totalWeight;
}

function masteryStatus(value: number, attempts: number): SkillMasteryStatus {
  if (attempts < 2) return "discovery";
  if (value < 55) return "fragile";
  if (value < 80 || attempts < 3) return "progressing";
  return "mastered";
}

function trendFor(scores: AttemptScore[]): SkillTrend {
  if (scores.length < 3) return "stable";

  const recent = scores.slice(0, Math.min(2, scores.length));
  const previous = scores.slice(2, Math.min(5, scores.length));
  if (!previous.length) return "stable";

  const delta = weightedAverage(recent) - weightedAverage(previous);
  if (delta >= 8) return "up";
  if (delta <= -8) return "down";
  return "stable";
}

export function buildSkillMastery(attempts: AttemptRecord[]): SkillMastery[] {
  const grouped = new Map<string, AttemptRecord[]>();

  attempts.forEach((attempt) => {
    const current = grouped.get(attempt.skill) ?? [];
    current.push(attempt);
    grouped.set(attempt.skill, current);
  });

  return [...grouped.entries()]
    .map(([label, skillAttempts]) => {
      const ordered = [...skillAttempts].sort((a, b) => b.completedAt.localeCompare(a.completedAt));
      const scores = ordered.map((attempt) => ({ accuracy: accuracy(attempt), completedAt: attempt.completedAt }));
      const rawMastery = weightedAverage(scores);
      const confidence = Math.min(100, Math.round((1 - Math.exp(-ordered.length / 3)) * 100));

      // Confidence prevents a single perfect mission from appearing as definitive mastery.
      const value = Math.round(rawMastery * (0.7 + confidence * 0.003));

      return {
        label,
        value: Math.min(100, value),
        attempts: ordered.length,
        confidence,
        status: masteryStatus(value, ordered.length),
        trend: trendFor(scores),
        lastPracticedAt: ordered[0]?.completedAt ?? new Date(0).toISOString(),
      };
    })
    .sort((a, b) => {
      const statusPriority: Record<SkillMasteryStatus, number> = {
        fragile: 0,
        discovery: 1,
        progressing: 2,
        mastered: 3,
      };
      return statusPriority[a.status] - statusPriority[b.status] || a.value - b.value;
    });
}
