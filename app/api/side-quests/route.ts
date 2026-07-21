import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getSideQuestDefinition } from "@/lib/game/side-quests";
import { ensureGameProfile, getSideQuestSnapshot } from "@/lib/game/side-quest-service";

async function getOwnedChild(slug: string) {
  const account = await getCurrentAccount();
  if (!account?.family) return null;
  return prisma.child.findFirst({ where: { slug, familyId: account.family.id }, select: { id: true, slug: true } });
}

export async function GET(request: Request) {
  const childSlug = new URL(request.url).searchParams.get("child");
  if (!childSlug) return NextResponse.json({ error: "Profil enfant requis." }, { status: 400 });
  const child = await getOwnedChild(childSlug);
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  return NextResponse.json(await getSideQuestSnapshot(child.id));
}

export async function POST(request: Request) {
  const body = await request.json() as { childSlug?: string; questId?: string; action?: "accept" | "claim" };
  if (!body.childSlug || !body.questId || !body.action) {
    return NextResponse.json({ error: "Action de quête incomplète." }, { status: 400 });
  }
  const child = await getOwnedChild(body.childSlug);
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  const quest = getSideQuestDefinition(body.questId);
  if (!quest) return NextResponse.json({ error: "Quête inconnue." }, { status: 404 });

  const current = await getSideQuestSnapshot(child.id);
  const questView = current.quests.find((entry) => entry.id === quest.id);
  if (!questView || questView.status === "locked") {
    return NextResponse.json({ error: "Cette quête n’est pas encore disponible." }, { status: 400 });
  }

  if (body.action === "accept") {
    if (questView.status !== "available") {
      return NextResponse.json({ error: "Cette quête est déjà en cours." }, { status: 400 });
    }
    await prisma.sideQuestProgress.upsert({
      where: { childId_questId: { childId: child.id, questId: quest.id } },
      create: { childId: child.id, questId: quest.id, acceptedAt: new Date() },
      update: { acceptedAt: new Date() },
    });
    return NextResponse.json({ ...(await getSideQuestSnapshot(child.id)), notice: `Quête « ${quest.title} » acceptée !` });
  }

  if (questView.status !== "claimable") {
    return NextResponse.json({ error: "L’objectif de cette quête n’est pas encore atteint." }, { status: 400 });
  }

  const profile = await ensureGameProfile(child.id);
  const unlockedItemIds = quest.reward.itemId && !profile.unlockedItemIds.includes(quest.reward.itemId)
    ? [...profile.unlockedItemIds, quest.reward.itemId]
    : profile.unlockedItemIds;
  const sideQuestBadgeIds = quest.reward.badge && !profile.sideQuestBadgeIds.includes(quest.reward.badge)
    ? [...profile.sideQuestBadgeIds, quest.reward.badge]
    : profile.sideQuestBadgeIds;
  await prisma.$transaction([
    prisma.childGameProfile.update({
      where: { childId: child.id },
      data: {
        coins: { increment: quest.reward.coins },
        bonusXp: { increment: quest.reward.xp },
        unlockedItemIds,
        sideQuestBadgeIds,
      },
    }),
    prisma.sideQuestProgress.update({
      where: { childId_questId: { childId: child.id, questId: quest.id } },
      data: { completedAt: new Date(), claimedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    ...(await getSideQuestSnapshot(child.id)),
    notice: `Récompense récupérée : +${quest.reward.xp} XP et +${quest.reward.coins} pièces !`,
    reward: quest.reward,
  });
}
