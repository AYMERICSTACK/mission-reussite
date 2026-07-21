import { getMissionsForChild } from "@/lib/content/missions";
import { prisma } from "@/lib/db/prisma";
import { recommendDailyMissions } from "@/lib/pedagogy/mission-engine";
import { buildServerSummary, serializeAttempt } from "@/lib/progress/server-summary";
import type { AttemptRecord, ChildKey, ChildProgressSummary, LearningTrack } from "@/lib/progress/types";
import { buildAdaptiveLearningProfile, type AdaptiveLearningProfile } from "@/lib/pedagogy/adaptive-learning";

export type DashboardData = {
  recommendations: ReturnType<typeof recommendDailyMissions>;
  summary: ChildProgressSummary;
  streak: number;
  weeklyProgress: number;
  attempts: AttemptRecord[];
  adaptiveProfile: AdaptiveLearningProfile;
};

function parisDateKey(date: Date) {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function computeStreak(attempts: AttemptRecord[], date = new Date()) {
  const completedDays = new Set(attempts.map((attempt) => parisDateKey(new Date(attempt.completedAt))));
  let streak = 0;
  const cursor = new Date(date);

  // A child keeps the current streak until the end of the current day.
  if (!completedDays.has(parisDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  while (completedDays.has(parisDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function computeWeeklyProgress(attempts: AttemptRecord[], date = new Date()) {
  const cursor = new Date(date);
  const parisDays = new Set(attempts.map((attempt) => parisDateKey(new Date(attempt.completedAt))));
  let completed = 0;

  for (let offset = 0; offset < 7; offset += 1) {
    const current = new Date(cursor);
    current.setDate(current.getDate() - offset);
    if (parisDays.has(parisDateKey(current))) completed += 1;
  }

  // Seven active days is the long-term objective; this remains easy to understand for children.
  return Math.round((completed / 7) * 100);
}

function emptySummary(child: ChildKey, firstName: string, grade: string): ChildProgressSummary {
  return {
    child,
    firstName,
    grade,
    totalXp: 0,
    completedMissions: 0,
    successRate: 0,
    totalMinutes: 0,
    hintsUsed: 0,
    skills: [],
  };
}

export async function getDashboardData(child: ChildKey, track: LearningTrack = child === "leony" ? "leony" : "alyssio", familyId?: string): Promise<DashboardData> {
  const missions = getMissionsForChild(track);

  try {
    const dbChild = familyId
      ? await prisma.child.findFirst({
      where: { slug: child, familyId },
      include: {
        attempts: { orderBy: { completedAt: "desc" }, include: { child: true, mission: true } },
        gameProfile: { select: { bonusXp: true } },
      },
    })
      : await prisma.child.findUnique({
      where: { slug: child },
      include: {
        attempts: {
          orderBy: { completedAt: "desc" },
          include: { child: true, mission: true },
        },
        gameProfile: { select: { bonusXp: true } },
      },
    });

    if (!dbChild) throw new Error("Profil introuvable");

    const attempts = dbChild.attempts.map(serializeAttempt);
    const summary = buildServerSummary(dbChild, attempts);
    summary.totalXp += dbChild.gameProfile?.bonusXp ?? 0;
    return {
      recommendations: recommendDailyMissions({ child: track, missions, attempts }),
      summary,
      streak: computeStreak(attempts),
      weeklyProgress: computeWeeklyProgress(attempts),
      attempts,
      adaptiveProfile: buildAdaptiveLearningProfile(track, attempts),
    };
  } catch (error) {
    console.error(`Dashboard pédagogique ${child}:`, error);
    return {
      recommendations: recommendDailyMissions({ child: track, missions, attempts: [] }),
      summary: emptySummary(child, child, track === "alyssio" ? "Mission CE2" : "Mission 6e"),
      streak: 0,
      weeklyProgress: 0,
      attempts: [],
      adaptiveProfile: buildAdaptiveLearningProfile(track, []),
    };
  }
}
