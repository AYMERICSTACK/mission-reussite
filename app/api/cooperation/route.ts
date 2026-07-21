import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { serializeAttempt } from "@/lib/progress/server-summary";
import { calculateGoalProgress } from "@/lib/cooperation/cooperation";

async function familyAccount() {
  const account = await getCurrentAccount();
  return account?.family ? account : null;
}

export async function GET(request: Request) {
  const account = await familyAccount();
  if (!account?.family) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("child");
  if (!slug) return NextResponse.json({ error: "Profil enfant requis." }, { status: 400 });
  const child = await prisma.child.findFirst({
    where: { slug, familyId: account.family.id },
    include: {
      attempts: { orderBy: { completedAt: "desc" }, include: { child: true, mission: true } },
      cooperationGoals: { orderBy: { createdAt: "desc" }, take: 6 },
      parentEncouragements: { orderBy: { createdAt: "desc" }, take: 8 },
    },
  });
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  const attempts = child.attempts.map(serializeAttempt);
  const goals = child.cooperationGoals.map((goal: { id: string; title: string; message: string | null; rewardLabel: string | null; targetCount: number; createdAt: Date; expiresAt: Date | null; completedAt: Date | null }) => {
    const calculated = calculateGoalProgress(goal.createdAt, goal.targetCount, attempts);
    return ({
    id: goal.id,
    title: goal.title,
    message: goal.message,
    rewardLabel: goal.rewardLabel,
    targetCount: goal.targetCount,
    createdAt: goal.createdAt.toISOString(),
    expiresAt: goal.expiresAt?.toISOString() ?? null,
    ...calculated,
    completed: Boolean(goal.completedAt) || calculated.completed,
  });
  });
  return NextResponse.json({ child: { slug: child.slug, firstName: child.firstName }, goals, encouragements: child.parentEncouragements });
}

export async function POST(request: Request) {
  const account = await familyAccount();
  if (!account?.family) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  const body = await request.json() as { childSlug?: string; type?: "goal" | "encouragement"; title?: string; message?: string; targetCount?: number; rewardLabel?: string };
  const child = await prisma.child.findFirst({ where: { slug: body.childSlug, familyId: account.family.id } });
  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  if (body.type === "encouragement") {
    const message = body.message?.trim();
    if (!message || message.length > 180) return NextResponse.json({ error: "Message invalide (180 caractères maximum)." }, { status: 400 });
    const encouragement = await prisma.parentEncouragement.create({ data: { childId: child.id, message } });
    return NextResponse.json({ encouragement });
  }
  const title = body.title?.trim();
  if (!title) return NextResponse.json({ error: "Titre de défi requis." }, { status: 400 });
  const targetCount = Math.max(1, Math.min(10, Number(body.targetCount) || 3));
  await prisma.cooperationGoal.updateMany({ where: { childId: child.id, completedAt: null }, data: { completedAt: new Date() } });
  const goal = await prisma.cooperationGoal.create({ data: { childId: child.id, title, message: body.message?.trim() || null, targetCount, rewardLabel: body.rewardLabel?.trim() || null } });
  return NextResponse.json({ goal });
}
