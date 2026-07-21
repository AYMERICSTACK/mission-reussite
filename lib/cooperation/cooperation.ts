import type { AttemptRecord } from "@/lib/progress/types";

export type CooperationGoalView = {
  id: string;
  title: string;
  message: string | null;
  rewardLabel: string | null;
  targetCount: number;
  progress: number;
  completed: boolean;
  createdAt: string;
  expiresAt: string | null;
};

export function calculateGoalProgress(createdAt: Date, targetCount: number, attempts: AttemptRecord[]) {
  const progress = attempts.filter((attempt) => new Date(attempt.completedAt) >= createdAt).length;
  return { progress: Math.min(progress, targetCount), completed: progress >= targetCount };
}
