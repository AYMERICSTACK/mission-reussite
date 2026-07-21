import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getBossBattle } from "@/lib/game/boss-battles";
import { starterItemIds } from "@/lib/game/avatar-catalog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const account = await getCurrentAccount();
    if (!account?.family) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
    const body = await request.json() as { childSlug?: string; chapterSlug?: string };
    const boss = getBossBattle(body.chapterSlug);
    if (!body.childSlug || !boss) return NextResponse.json({ error: "Récompense de boss invalide." }, { status: 400 });

    const child = await prisma.child.findFirst({
      where: { slug: body.childSlug, familyId: account.family.id },
      include: { gameProfile: true },
    });
    if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });

    const profile = child.gameProfile ?? await prisma.childGameProfile.create({
      data: { childId: child.id, unlockedItemIds: starterItemIds },
    });
    const alreadyClaimed = profile.defeatedBossIds.includes(boss.chapterSlug);
    if (alreadyClaimed) {
      return NextResponse.json({ ok: true, alreadyClaimed: true, reward: boss.reward });
    }

    const updated = await prisma.childGameProfile.update({
      where: { childId: child.id },
      data: {
        coins: { increment: boss.reward.coinReward },
        bonusXp: { increment: boss.reward.xpReward },
        defeatedBossIds: { push: boss.chapterSlug },
        bossTrophyIds: { push: boss.reward.trophyId },
        legendaryChestIds: { push: boss.chapterSlug },
        unlockedItemIds: { push: boss.reward.itemId },
      },
    });

    return NextResponse.json({
      ok: true,
      alreadyClaimed: false,
      reward: boss.reward,
      wallet: { coins: updated.coins, bonusXp: updated.bonusXp },
    });
  } catch (error) {
    console.error("Récompense de boss:", error);
    return NextResponse.json({ error: "La récompense légendaire n’a pas pu être enregistrée." }, { status: 500 });
  }
}
