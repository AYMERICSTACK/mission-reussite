import { buildKnowledgeGraphMastery } from "@/lib/pedagogy/knowledge-graph";
import type { AttemptRecord, ChildKey, ChildProgressSummary } from "./types";

export const PROGRESS_STORAGE_KEY = "mission-reussite:attempts:v1";

export function readAttempts(): AttemptRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: AttemptRecord) {
  if (typeof window === "undefined") return;
  const attempts = readAttempts();
  const withoutReplayDuplicate = attempts.filter(
    (item) => !(item.child === attempt.child && item.missionId === attempt.missionId && item.completedAt === attempt.completedAt),
  );
  window.localStorage.setItem(
    PROGRESS_STORAGE_KEY,
    JSON.stringify([attempt, ...withoutReplayDuplicate].slice(0, 250)),
  );
  window.dispatchEvent(new CustomEvent("mission-progress-updated"));
}

const profiles: Record<ChildKey, { firstName: string; grade: string }> = {
  alyssio: { firstName: "Alyssio", grade: "Mission CE2" },
  leony: { firstName: "Léony", grade: "Mission 6e" },
};

export function buildSummary(child: ChildKey, attempts: AttemptRecord[]): ChildProgressSummary {
  const childAttempts = attempts
    .filter((attempt) => attempt.child === child)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
  const totalQuestions = childAttempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const correctAnswers = childAttempts.reduce((sum, attempt) => sum + attempt.correctAnswers, 0);

  return {
    child,
    ...profiles[child],
    totalXp: childAttempts.reduce((sum, attempt) => sum + attempt.xp, 0),
    completedMissions: childAttempts.length,
    successRate: totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    totalMinutes: Math.max(0, Math.round(childAttempts.reduce((sum, attempt) => sum + attempt.durationSeconds, 0) / 60)),
    hintsUsed: childAttempts.reduce((sum, attempt) => sum + attempt.hintsUsed, 0),
    skills: buildKnowledgeGraphMastery(childAttempts),
    latestAttempt: childAttempts[0],
  };
}
