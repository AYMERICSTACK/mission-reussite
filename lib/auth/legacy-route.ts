import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireAccount } from "@/lib/auth/session";
import type { LearningTrack } from "@/lib/progress/types";

export async function redirectToTrack(track: LearningTrack, suffix = "") {
  const account = await requireAccount();
  const child = await prisma.child.findFirst({ where: { familyId: account.family!.id, track }, orderBy: { createdAt: "asc" } });
  if (!child) notFound();
  redirect(`/mission/${child.slug}${suffix}`);
}
