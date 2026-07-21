import { getMissionsForChild } from "@/lib/content/missions";
import { getAdventureWorld } from "@/lib/content/adventure-worlds";
import type { AttemptRecord, LearningTrack } from "@/lib/progress/types";

export type AdventureCollectible = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
  kind: "treasure" | "companion" | "relic";
};

export type AdventureInventory = {
  completedQuestIds: string[];
  exploredStageIds: string[];
  treasures: AdventureCollectible[];
  companions: AdventureCollectible[];
  relics: AdventureCollectible[];
  unlockedCount: number;
  totalCount: number;
  worldLevel: number;
  worldMessage: string;
};

const stageSymbols: Record<string, string> = {
  "sentier-feuilles": "🍂",
  "riviere-chantante": "💎",
  "clairiere-lucioles": "🏮",
  "grand-chene": "🌰",
  "porte-idees": "🗝️",
  "archives-flottantes": "📜",
  "pont-enigmes": "⚙️",
  "tour-aube": "🔷",
};

const chapterRelics: Record<LearningTrack, AdventureCollectible> = {
  alyssio: {
    id: "relic-forest-map",
    name: "La carte vivante de la forêt",
    symbol: "🗺️",
    description: "Elle révèle les passages secrets du prochain chapitre.",
    unlocked: false,
    progress: 0,
    target: 4,
    kind: "relic",
  },
  leony: {
    id: "relic-city-code",
    name: "Le code complet de l’Aube",
    symbol: "🌅",
    description: "Il rallume la Tour et ouvre une nouvelle expédition.",
    unlocked: false,
    progress: 0,
    target: 4,
    kind: "relic",
  },
};

export function buildAdventureInventory(child: LearningTrack, attempts: AttemptRecord[]): AdventureInventory {
  const world = getAdventureWorld(child);
  const missions = getMissionsForChild(child);
  const completedQuestIds = [...new Set(attempts.map((attempt) => attempt.missionId))];
  const completedSet = new Set(completedQuestIds);
  const stageMissionIds = new Map<string, string[]>();

  for (const mission of missions) {
    const current = stageMissionIds.get(mission.adventureStageId) ?? [];
    current.push(mission.id);
    stageMissionIds.set(mission.adventureStageId, current);
  }

  const treasures = world.stages.map((stage) => {
    const ids = stageMissionIds.get(stage.id) ?? [];
    const completed = ids.filter((id) => completedSet.has(id)).length;
    const target = Math.min(3, Math.max(1, ids.length));
    return {
      id: `treasure-${stage.id}`,
      name: stage.reward,
      symbol: stageSymbols[stage.id] ?? stage.symbol,
      description: `Trésor de ${stage.name}. Termine ${target} quêtes différentes dans ce lieu pour le récupérer.`,
      unlocked: completed >= target,
      progress: Math.min(completed, target),
      target,
      kind: "treasure" as const,
    };
  });

  const exploredStageIds = world.stages
    .filter((stage) => (stageMissionIds.get(stage.id) ?? []).some((id) => completedSet.has(id)))
    .map((stage) => stage.id);

  const companions = world.companions.map((companion, index) => {
    const stage = world.stages[Math.min(index, world.stages.length - 1)];
    const met = exploredStageIds.includes(stage.id);
    return {
      id: `companion-${companion.name.toLowerCase()}`,
      name: companion.name,
      symbol: companion.symbol,
      description: companion.role,
      unlocked: met,
      progress: met ? 1 : 0,
      target: 1,
      kind: "companion" as const,
    };
  });

  const treasureCount = treasures.filter((item) => item.unlocked).length;
  const baseRelic = chapterRelics[child];
  const relics = [{ ...baseRelic, unlocked: treasureCount === treasures.length, progress: treasureCount }];
  const all = [...treasures, ...companions, ...relics];
  const unlockedCount = all.filter((item) => item.unlocked).length;
  const worldLevel = Math.min(4, treasureCount);
  const worldMessages = [
    "Le monde attend encore ses premières étincelles.",
    "Une lumière nouvelle apparaît sur la carte.",
    "Les compagnons sentent que le monde reprend vie.",
    "Les chemins brillent et de nouveaux secrets se réveillent.",
    "Le chapitre rayonne : le passage vers la suite est presque ouvert.",
  ];

  return {
    completedQuestIds,
    exploredStageIds,
    treasures,
    companions,
    relics,
    unlockedCount,
    totalCount: all.length,
    worldLevel,
    worldMessage: worldMessages[worldLevel],
  };
}
