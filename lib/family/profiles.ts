import { prisma } from "@/lib/db/prisma";
import type { LearningTrack } from "@/lib/progress/types";

export type ChildProfile = {
  id: string;
  slug: string;
  firstName: string;
  grade: string;
  age: number | null;
  interests: string[];
  objective: string | null;
  track: LearningTrack;
};

export function trackFromGrade(grade: string): LearningTrack {
  const value = grade.toLowerCase();
  return value.includes("6") || value.includes("collège") ? "leony" : "alyssio";
}

export function dashboardPath(slug: string) {
  return `/mission/${slug}`;
}

export async function getChildProfile(slug: string, familyId?: string): Promise<ChildProfile | null> {
  const child = familyId
    ? await prisma.child.findFirst({ where: { slug, familyId } })
    : await prisma.child.findUnique({ where: { slug } });
  if (!child) return null;
  return {
    id: child.id,
    slug: child.slug,
    firstName: child.firstName,
    grade: child.grade,
    age: child.age,
    interests: child.interests,
    objective: child.objective,
    track: child.track as LearningTrack,
  };
}
