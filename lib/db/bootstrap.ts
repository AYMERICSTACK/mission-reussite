import { prisma } from "@/lib/db/prisma";
import { learningMissions } from "@/lib/content/missions";

const children = [
  { slug: "alyssio", firstName: "Alyssio", grade: "Mission CE2", track: "alyssio", age: 8, interests: ["football", "aventures"] },
  { slug: "leony", firstName: "Léony", grade: "Mission 6e", track: "leony", age: 10, interests: ["lecture", "organisation"] },
] as const;

const MISSION_BATCH_SIZE = 10;

let bootstrapPromise: Promise<void> | null = null;

function missionData() {
  return learningMissions.map((mission) => ({
    id: mission.id,
    title: mission.title,
    category: mission.category,
    skill: mission.skill,
    grade: mission.grade,
    xp: mission.xp,
  }));
}

async function seedLegacyFamilyWhenDatabaseIsEmpty() {
  const familyCount = await prisma.family.count();
  if (familyCount > 0) return;

  const family = await prisma.family.create({
    data: { id: "family-default", name: "Famille DJERIDI" },
  });

  await Promise.all(
    children.map((child) => {
      const childData = {
        ...child,
        interests: [...child.interests],
        familyId: family.id,
      };

      return prisma.child.upsert({
        where: { slug: child.slug },
        update: childData,
        create: childData,
      });
    }),
  );
}

async function syncMissions() {
  const missions = missionData();

  // Les missions sont synchronisées par petits lots sans transaction globale.
  // Une transaction contenant tout le catalogue dépassait parfois les 5 secondes
  // sur Neon et provoquait l'erreur Prisma P2028.
  for (let index = 0; index < missions.length; index += MISSION_BATCH_SIZE) {
    const batch = missions.slice(index, index + MISSION_BATCH_SIZE);

    await Promise.all(
      batch.map((data) =>
        prisma.mission.upsert({
          where: { id: data.id },
          update: data,
          create: data,
        }),
      ),
    );
  }
}

async function runInitialDataBootstrap() {
  await seedLegacyFamilyWhenDatabaseIsEmpty();
  await syncMissions();
}

export async function ensureInitialData() {
  // Évite que plusieurs requêtes simultanées relancent le même bootstrap
  // dans un même processus Next.js. En cas d'échec, un nouvel essai reste possible.
  bootstrapPromise ??= runInitialDataBootstrap().finally(() => {
    bootstrapPromise = null;
  });

  return bootstrapPromise;
}
