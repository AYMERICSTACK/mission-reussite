import { prisma } from "@/lib/db/prisma";
import { getEarnedItemIds, starterItemIds } from "@/lib/game/avatar-catalog";
import {
  getQuestProgress,
  hasRareEquipment,
  sideQuestCatalog,
  type SideQuestMetrics,
  type SideQuestView,
} from "@/lib/game/side-quests";

export const defaultGameEquipment = {
  equippedBody: "body-explorer",
  equippedOutfit: null,
  equippedHead: null,
  equippedAccessory: null,
  equippedCompanion: "companion-oscar",
};

export async function ensureGameProfile(childId: string) {
  return prisma.childGameProfile.upsert({
    where: { childId },
    create: { childId, unlockedItemIds: starterItemIds, ...defaultGameEquipment },
    update: {},
  });
}

export async function getSideQuestSnapshot(childId: string) {
  const [attempts, progressRows] = await Promise.all([
    prisma.attempt.findMany({ where: { childId }, select: { missionId: true } }),
    prisma.sideQuestProgress.findMany({ where: { childId } }),
  ]);
  const profile = await ensureGameProfile(childId);
  const completedMissionCount = new Set(attempts.map((attempt) => attempt.missionId)).size;
  const naturallyEarned = getEarnedItemIds(completedMissionCount);
  const unlockedItemIds = [...new Set([...starterItemIds, ...naturallyEarned, ...profile.unlockedItemIds])];
  const metrics: SideQuestMetrics = {
    completedMissionCount,
    claimedChests: profile.claimedChests,
    unlockedItemCount: unlockedItemIds.length,
    rareItemEquipped: hasRareEquipment([
      profile.equippedBody,
      profile.equippedOutfit,
      profile.equippedHead,
      profile.equippedAccessory,
      profile.equippedCompanion,
    ]),
  };
  const progressByQuest = new Map(progressRows.map((row) => [row.questId, row]));
  const quests: SideQuestView[] = sideQuestCatalog.map((quest) => {
    const row = progressByQuest.get(quest.id);
    const progress = getQuestProgress(quest, metrics);
    const unlocked = completedMissionCount >= quest.unlockAtMissions;
    const status = row?.claimedAt
      ? "claimed"
      : !unlocked
        ? "locked"
        : !row?.acceptedAt
          ? "available"
          : progress >= quest.target
            ? "claimable"
            : "active";
    return {
      ...quest,
      progress,
      percent: Math.round((progress / Math.max(1, quest.target)) * 100),
      status,
      acceptedAt: row?.acceptedAt?.toISOString() ?? null,
      claimedAt: row?.claimedAt?.toISOString() ?? null,
    };
  });

  return {
    quests,
    metrics,
    wallet: {
      coins: profile.coins,
      bonusXp: profile.bonusXp,
      badgeIds: profile.sideQuestBadgeIds,
    },
    summary: {
      available: quests.filter((quest) => quest.status === "available").length,
      active: quests.filter((quest) => quest.status === "active").length,
      claimable: quests.filter((quest) => quest.status === "claimable").length,
      claimed: quests.filter((quest) => quest.status === "claimed").length,
    },
  };
}
