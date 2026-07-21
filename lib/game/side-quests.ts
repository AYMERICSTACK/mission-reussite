import { findAvatarItem } from "@/lib/game/avatar-catalog";

export type SideQuestNpc = "oscar" | "nova" | "lyra" | "kael" | "orion";
export type SideQuestObjective = "missions" | "chests" | "rare-equipped" | "items";

export type SideQuestDefinition = {
  id: string;
  npcId: SideQuestNpc;
  title: string;
  symbol: string;
  description: string;
  objectiveLabel: string;
  objective: SideQuestObjective;
  target: number;
  unlockAtMissions: number;
  reward: {
    xp: number;
    coins: number;
    itemId?: string;
    badge?: string;
  };
};

export type SideQuestMetrics = {
  completedMissionCount: number;
  claimedChests: number;
  unlockedItemCount: number;
  rareItemEquipped: boolean;
};

export type SideQuestStatus = "locked" | "available" | "active" | "claimable" | "claimed";

export type SideQuestView = SideQuestDefinition & {
  progress: number;
  percent: number;
  status: SideQuestStatus;
  acceptedAt: string | null;
  claimedAt: string | null;
};

export const sideQuestCatalog: SideQuestDefinition[] = [
  {
    id: "oscar-premiers-pas",
    npcId: "oscar",
    title: "Les premiers pas",
    symbol: "👣",
    description: "Oscar veut vérifier que tu sais avancer avec courage dans les premières missions.",
    objectiveLabel: "Terminer 3 missions différentes",
    objective: "missions",
    target: 3,
    unlockAtMissions: 0,
    reward: { xp: 40, coins: 30, badge: "Ami d’Oscar" },
  },
  {
    id: "nova-etincelle-savoir",
    npcId: "nova",
    title: "L’étincelle du savoir",
    symbol: "✨",
    description: "Nova rassemble les connaissances nécessaires pour rallumer son observatoire.",
    objectiveLabel: "Terminer 12 missions différentes",
    objective: "missions",
    target: 12,
    unlockAtMissions: 6,
    reward: { xp: 70, coins: 50, itemId: "accessory-nova-scroll", badge: "Éclaireur du savoir" },
  },
  {
    id: "orion-premier-coffre",
    npcId: "orion",
    title: "Le coffre des souvenirs",
    symbol: "🎁",
    description: "Orion cherche un premier trésor à exposer dans la Maison des Trésors.",
    objectiveLabel: "Ouvrir 1 coffre d’aventure",
    objective: "chests",
    target: 1,
    unlockAtMissions: 6,
    reward: { xp: 60, coins: 60, badge: "Gardien des trésors" },
  },
  {
    id: "kael-style-heros",
    npcId: "kael",
    title: "Le style d’un héros",
    symbol: "⚒️",
    description: "Kael te met au défi d’équiper un objet rare, épique ou légendaire.",
    objectiveLabel: "Équiper 1 objet rare ou supérieur",
    objective: "rare-equipped",
    target: 1,
    unlockAtMissions: 8,
    reward: { xp: 80, coins: 70, itemId: "head-forge-spark", badge: "Apprenti forgeron" },
  },
  {
    id: "lyra-cartographe",
    npcId: "lyra",
    title: "La route cachée",
    symbol: "🗺️",
    description: "Lyra a besoin d’un explorateur expérimenté pour tracer un nouveau chemin sur la carte.",
    objectiveLabel: "Terminer 30 missions différentes",
    objective: "missions",
    target: 30,
    unlockAtMissions: 18,
    reward: { xp: 110, coins: 90, itemId: "outfit-pathfinder", badge: "Cartographe du village" },
  },
  {
    id: "orion-collectionneur",
    npcId: "orion",
    title: "La collection grandit",
    symbol: "🏆",
    description: "Orion souhaite remplir une nouvelle vitrine avec tes découvertes.",
    objectiveLabel: "Posséder 8 objets d’avatar",
    objective: "items",
    target: 8,
    unlockAtMissions: 24,
    reward: { xp: 120, coins: 100, badge: "Collectionneur émérite" },
  },
  {
    id: "nova-grand-savant",
    npcId: "nova",
    title: "Le grand cercle du savoir",
    symbol: "🌟",
    description: "Une longue quête réservée aux aventuriers qui maîtrisent déjà plusieurs mondes.",
    objectiveLabel: "Terminer 60 missions différentes",
    objective: "missions",
    target: 60,
    unlockAtMissions: 42,
    reward: { xp: 180, coins: 150, itemId: "companion-star-sprite", badge: "Savant des mondes" },
  },
];


export function getSideQuestDefinition(id: string) {
  return sideQuestCatalog.find((quest) => quest.id === id);
}

export function getQuestProgress(quest: SideQuestDefinition, metrics: SideQuestMetrics) {
  switch (quest.objective) {
    case "missions":
      return Math.min(quest.target, metrics.completedMissionCount);
    case "chests":
      return Math.min(quest.target, metrics.claimedChests);
    case "items":
      return Math.min(quest.target, metrics.unlockedItemCount);
    case "rare-equipped":
      return metrics.rareItemEquipped ? 1 : 0;
  }
}

export function hasRareEquipment(equipmentIds: Array<string | null | undefined>) {
  return equipmentIds.some((id) => {
    const item = findAvatarItem(id);
    return item?.rarity === "rare" || item?.rarity === "epic" || item?.rarity === "legendary";
  });
}
