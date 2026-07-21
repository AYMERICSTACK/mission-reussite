import { buildKnowledgeGraphMastery } from "@/lib/pedagogy/knowledge-graph";
import type { AttemptRecord, ChildKey, ChildProgressSummary } from "./types";

type DbAttempt = {
  id: string;
  correctAnswers: number;
  totalQuestions: number;
  mistakes: number;
  hintsUsed: number;
  durationSeconds: number;
  completedAt: Date;
  child: { slug: string; firstName: string; grade: string };
  mission: { id: string; title: string; category: string; skill: string; grade: string; xp: number };
};

export function serializeAttempt(attempt: DbAttempt): AttemptRecord {
  return {
    id: attempt.id,
    child: attempt.child.slug as ChildKey,
    missionId: attempt.mission.id,
    missionTitle: attempt.mission.title,
    category: attempt.mission.category,
    skill: attempt.mission.skill,
    grade: attempt.mission.grade,
    xp: attempt.mission.xp,
    correctAnswers: attempt.correctAnswers,
    totalQuestions: attempt.totalQuestions,
    mistakes: attempt.mistakes,
    hintsUsed: attempt.hintsUsed,
    durationSeconds: attempt.durationSeconds,
    completedAt: attempt.completedAt.toISOString(),
  };
}

export function buildServerSummary(
  child: { slug: string; firstName: string; grade: string },
  attempts: AttemptRecord[],
): ChildProgressSummary {
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const correctAnswers = attempts.reduce((sum, attempt) => sum + attempt.correctAnswers, 0);

  return {
    child: child.slug as ChildKey,
    firstName: child.firstName,
    grade: child.grade,
    totalXp: attempts.reduce((sum, attempt) => sum + attempt.xp, 0),
    completedMissions: attempts.length,
    successRate: totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    totalMinutes: Math.max(0, Math.round(attempts.reduce((sum, attempt) => sum + attempt.durationSeconds, 0) / 60)),
    hintsUsed: attempts.reduce((sum, attempt) => sum + attempt.hintsUsed, 0),
    skills: buildKnowledgeGraphMastery(attempts),
    latestAttempt: attempts[0],
  };
}
