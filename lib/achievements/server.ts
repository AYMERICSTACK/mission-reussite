import { prisma } from "@/lib/db/prisma";
import type { AchievementGameStats } from "@/lib/achievements/achievements";

export async function getAchievementGameStats(childId: string): Promise<AchievementGameStats> {
  const [profile, claimedSideQuests] = await Promise.all([
    prisma.childGameProfile.findUnique({ where: { childId } }),
    prisma.sideQuestProgress.count({ where: { childId, claimedAt: { not: null } } }),
  ]);

  return {
    bonusXp: profile?.bonusXp ?? 0,
    coins: profile?.coins ?? 0,
    defeatedBossIds: profile?.defeatedBossIds ?? [],
    bossTrophyIds: profile?.bossTrophyIds ?? [],
    legendaryChestIds: profile?.legendaryChestIds ?? [],
    unlockedItemIds: profile?.unlockedItemIds ?? [],
    claimedSideQuests,
    updatedAt: profile?.updatedAt ?? null,
  };
}
