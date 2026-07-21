import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { starterItemIds } from "@/lib/game/avatar-catalog";

async function getChild(childSlug: string) {
  const account = await getCurrentAccount();
  if (!account?.family) return null;
  return prisma.child.findFirst({ where: { slug: childSlug, familyId: account.family.id }, include: { gameProfile: true } });
}

async function ensureProfile(childId: string) {
  return prisma.childGameProfile.upsert({
    where: { childId },
    create: { childId, unlockedItemIds: starterItemIds },
    update: {},
  });
}

export async function GET(request: Request) {
  const childSlug = new URL(request.url).searchParams.get("child");
  if (!childSlug) return NextResponse.json({ error: "Profil enfant requis." }, { status: 400 });
  const child = await getChild(childSlug);
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  const profile = child.gameProfile ?? await ensureProfile(child.id);
  return NextResponse.json({ seenCinematicIds: profile.sideQuestBadgeIds.filter((id) => id.startsWith("cinematic:")).map((id) => id.slice("cinematic:".length)) });
}

export async function POST(request: Request) {
  const body = await request.json() as { childSlug?: string; cinematicId?: string };
  if (!body.childSlug || !body.cinematicId) return NextResponse.json({ error: "Cinématique invalide." }, { status: 400 });
  const child = await getChild(body.childSlug);
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  const profile = child.gameProfile ?? await ensureProfile(child.id);
  const storedId = `cinematic:${body.cinematicId}`;
  if (!profile.sideQuestBadgeIds.includes(storedId)) {
    await prisma.childGameProfile.update({ where: { childId: child.id }, data: { sideQuestBadgeIds: { push: storedId } } });
  }
  return NextResponse.json({ ok: true });
}
