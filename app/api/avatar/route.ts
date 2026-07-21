import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import {
  avatarCatalog,
  chestItems,
  findAvatarItem,
  getEarnedItemIds,
  starterItemIds,
  type AvatarSlot,
} from "@/lib/game/avatar-catalog";
import { recordTutorialEvent } from "@/lib/game/tutorial-service";

const defaultEquipment = {
  equippedBody: "body-explorer",
  equippedOutfit: null,
  equippedHead: null,
  equippedAccessory: null,
  equippedCompanion: "companion-oscar",
};

async function getOwnedChild(slug: string) {
  const account = await getCurrentAccount();

  if (!account?.family) {
    return null;
  }

  return prisma.child.findFirst({
    where: {
      slug,
      familyId: account.family.id,
    },
    include: {
      attempts: {
        select: {
          missionId: true,
        },
      },
      gameProfile: true,
    },
  });
}

async function ensureProfile(childId: string) {
  return prisma.childGameProfile.upsert({
    where: {
      childId,
    },
    create: {
      childId,
      unlockedItemIds: starterItemIds,
      ...defaultEquipment,
    },
    update: {},
  });
}

function responsePayload(
  child: NonNullable<Awaited<ReturnType<typeof getOwnedChild>>>,
  profile: Awaited<ReturnType<typeof ensureProfile>>,
) {
  const completedMissionCount = new Set(
    child.attempts.map(
      (attempt: (typeof child.attempts)[number]) => attempt.missionId,
    ),
  ).size;

  const earned = getEarnedItemIds(completedMissionCount);

  const unlockedItemIds = [
    ...new Set([...starterItemIds, ...earned, ...profile.unlockedItemIds]),
  ];

  const availableChests = Math.min(
    chestItems.length,
    Math.floor(completedMissionCount / 6),
  );

  return {
    child: {
      slug: child.slug,
      firstName: child.firstName,
    },
    catalog: avatarCatalog,
    completedMissionCount,
    coins: profile.coins,
    claimedChests: profile.claimedChests,
    availableChests,
    unopenedChests: Math.max(0, availableChests - profile.claimedChests),
    unlockedItemIds,
    equipment: {
      body: profile.equippedBody,
      outfit: profile.equippedOutfit,
      head: profile.equippedHead,
      accessory: profile.equippedAccessory,
      companion: profile.equippedCompanion,
    },
  };
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("child");

  if (!slug) {
    return NextResponse.json(
      { error: "Profil enfant requis." },
      { status: 400 },
    );
  }

  const child = await getOwnedChild(slug);

  if (!child) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }

  const profile = child.gameProfile ?? (await ensureProfile(child.id));

  return NextResponse.json(responsePayload(child, profile));
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    childSlug?: string;
    slot?: AvatarSlot;
    itemId?: string | null;
  };

  if (!body.childSlug || !body.slot) {
    return NextResponse.json(
      { error: "Équipement incomplet." },
      { status: 400 },
    );
  }

  const child = await getOwnedChild(body.childSlug);

  if (!child) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }

  const profile = child.gameProfile ?? (await ensureProfile(child.id));

  const completedMissionCount = new Set(
    child.attempts.map(
      (attempt: (typeof child.attempts)[number]) => attempt.missionId,
    ),
  ).size;

  const unlocked = new Set([
    ...starterItemIds,
    ...getEarnedItemIds(completedMissionCount),
    ...profile.unlockedItemIds,
  ]);

  const item = body.itemId ? findAvatarItem(body.itemId) : undefined;

  if (
    body.itemId &&
    (!item || item.slot !== body.slot || !unlocked.has(body.itemId))
  ) {
    return NextResponse.json(
      { error: "Cet objet ne peut pas être équipé." },
      { status: 400 },
    );
  }

  if (body.slot === "body" && !body.itemId) {
    return NextResponse.json(
      { error: "Un avatar de base est requis." },
      { status: 400 },
    );
  }

  const field = {
    body: "equippedBody",
    outfit: "equippedOutfit",
    head: "equippedHead",
    accessory: "equippedAccessory",
    companion: "equippedCompanion",
  }[body.slot] as
    | "equippedBody"
    | "equippedOutfit"
    | "equippedHead"
    | "equippedAccessory"
    | "equippedCompanion";

  await prisma.childGameProfile.update({
    where: {
      childId: child.id,
    },
    data: {
      [field]: body.itemId ?? null,
    },
  });

  if (body.itemId) {
    await recordTutorialEvent(child.id, "item-equipped");
  }

  const refreshed = await prisma.childGameProfile.findUniqueOrThrow({
    where: {
      childId: child.id,
    },
  });

  return NextResponse.json(responsePayload(child, refreshed));
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    childSlug?: string;
    action?: "open-chest";
  };

  if (!body.childSlug || body.action !== "open-chest") {
    return NextResponse.json({ error: "Action invalide." }, { status: 400 });
  }

  const child = await getOwnedChild(body.childSlug);

  if (!child) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }

  const profile = child.gameProfile ?? (await ensureProfile(child.id));

  const completedMissionCount = new Set(
    child.attempts.map(
      (attempt: (typeof child.attempts)[number]) => attempt.missionId,
    ),
  ).size;

  const availableChests = Math.min(
    chestItems.length,
    Math.floor(completedMissionCount / 6),
  );

  if (profile.claimedChests >= availableChests) {
    return NextResponse.json(
      {
        error: "Aucun coffre n’est disponible pour le moment.",
      },
      { status: 400 },
    );
  }

  const reward = chestItems[profile.claimedChests];
  const coinReward = 50 + profile.claimedChests * 10;

  await prisma.childGameProfile.update({
    where: {
      childId: child.id,
    },
    data: {
      claimedChests: {
        increment: 1,
      },
      coins: {
        increment: coinReward,
      },
      unlockedItemIds: {
        push: reward.id,
      },
    },
  });

  await recordTutorialEvent(child.id, "chest-opened");

  const refreshed = await prisma.childGameProfile.findUniqueOrThrow({
    where: {
      childId: child.id,
    },
  });

  return NextResponse.json({
    ...responsePayload(child, refreshed),
    reward,
    coinReward,
  });
}
