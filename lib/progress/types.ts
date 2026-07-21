import type { KnowledgeSkillMastery } from "@/lib/pedagogy/knowledge-graph";

export type ChildKey = string;
export type LearningTrack = "alyssio" | "leony";

export type AttemptRecord = {
  id: string;
  child: ChildKey;
  missionId: string;
  missionTitle: string;
  category: string;
  skill: string;
  grade: string;
  xp: number;
  correctAnswers: number;
  totalQuestions: number;
  mistakes: number;
  hintsUsed: number;
  durationSeconds: number;
  completedAt: string;
};

export type ChildProgressSummary = {
  child: ChildKey;
  firstName: string;
  grade: string;
  totalXp: number;
  completedMissions: number;
  successRate: number;
  totalMinutes: number;
  hintsUsed: number;
  skills: KnowledgeSkillMastery[];
  latestAttempt?: AttemptRecord;
};
