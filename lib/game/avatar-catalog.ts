export type AvatarSlot = "body" | "outfit" | "head" | "accessory" | "companion";
export type AvatarRarity = "common" | "rare" | "epic" | "legendary";

export type AvatarItem = {
  id: string;
  name: string;
  slot: AvatarSlot;
  rarity: AvatarRarity;
  symbol: string;
  description: string;
  unlock: { type: "starter" | "missions" | "chest" | "quest" | "boss" | "tutorial"; value: number };
};

export const avatarCatalog: AvatarItem[] = [
  { id: "body-explorer", name: "Explorateur", slot: "body", rarity: "common", symbol: "🧒", description: "La tenue de départ des jeunes aventuriers.", unlock: { type: "starter", value: 0 } },
  { id: "body-starlight", name: "Éclat stellaire", slot: "body", rarity: "epic", symbol: "🧑‍🚀", description: "Un avatar illuminé par le cœur de Nova.", unlock: { type: "missions", value: 90 } },
  { id: "outfit-forest", name: "Cape des lucioles", slot: "outfit", rarity: "common", symbol: "🥬", description: "Une cape légère gagnée dans la forêt.", unlock: { type: "missions", value: 3 } },
  { id: "outfit-cartographer", name: "Veste de cartographe", slot: "outfit", rarity: "rare", symbol: "🧥", description: "Ses poches cachent cartes et boussoles.", unlock: { type: "missions", value: 36 } },
  { id: "outfit-legend", name: "Armure légendaire", slot: "outfit", rarity: "legendary", symbol: "🛡️", description: "La marque des héros ayant traversé toute la Saison 1.", unlock: { type: "missions", value: 180 } },
  { id: "head-leaf", name: "Couronne de feuilles", slot: "head", rarity: "common", symbol: "🌿", description: "Les feuilles du Grand Chêne ne fanent jamais.", unlock: { type: "missions", value: 12 } },
  { id: "head-crystal", name: "Diadème cristallin", slot: "head", rarity: "epic", symbol: "💎", description: "Il réfracte la lumière du désert.", unlock: { type: "missions", value: 132 } },
  { id: "accessory-compass", name: "Boussole des lucioles", slot: "accessory", rarity: "rare", symbol: "🧭", description: "Elle indique toujours le chemin du courage.", unlock: { type: "missions", value: 6 } },
  { id: "accessory-key", name: "Clé d’émeraude", slot: "accessory", rarity: "epic", symbol: "🗝️", description: "Elle ouvre les passages que l’on croyait perdus.", unlock: { type: "missions", value: 126 } },
  { id: "companion-oscar", name: "Oscar", slot: "companion", rarity: "common", symbol: "🦉", description: "Le guide fidèle de toutes les aventures.", unlock: { type: "starter", value: 0 } },
  { id: "companion-nova", name: "Nova miniature", slot: "companion", rarity: "epic", symbol: "✨", description: "Une petite étincelle de Nova te suit partout.", unlock: { type: "chest", value: 1 } },
  { id: "companion-mini-nova", name: "Mini Nova", slot: "companion", rarity: "legendary", symbol: "🌠", description: "La récompense exclusive des aventuriers ayant terminé le tutoriel.", unlock: { type: "tutorial", value: 1 } },
  { id: "companion-fox", name: "Renard des brumes", slot: "companion", rarity: "rare", symbol: "🦊", description: "Un compagnon rusé découvert dans un coffre.", unlock: { type: "chest", value: 2 } },
  { id: "head-sun", name: "Couronne solaire", slot: "head", rarity: "legendary", symbol: "☀️", description: "Une couronne forgée dans la lumière de l’Aube.", unlock: { type: "chest", value: 3 } },
  { id: "outfit-cloud", name: "Manteau des nuages", slot: "outfit", rarity: "epic", symbol: "☁️", description: "Il semble flotter à chacun de tes pas.", unlock: { type: "chest", value: 4 } },
  { id: "accessory-orb", name: "Orbe du temps", slot: "accessory", rarity: "legendary", symbol: "🔮", description: "Le premier indice menant aux Îles du Temps.", unlock: { type: "chest", value: 5 } },
  { id: "accessory-nova-scroll", name: "Parchemin de Nova", slot: "accessory", rarity: "epic", symbol: "📜", description: "Un parchemin brillant offert après une quête de Nova.", unlock: { type: "quest", value: 1 } },
  { id: "head-forge-spark", name: "Étincelle de la forge", slot: "head", rarity: "epic", symbol: "🔥", description: "La marque des apprentis de Kael.", unlock: { type: "quest", value: 2 } },
  { id: "outfit-pathfinder", name: "Tenue du pisteur", slot: "outfit", rarity: "legendary", symbol: "🥾", description: "Une tenue réservée aux cartographes du village.", unlock: { type: "quest", value: 3 } },
  { id: "companion-star-sprite", name: "Esprit stellaire", slot: "companion", rarity: "legendary", symbol: "🌟", description: "Une petite étoile vivante née dans l’observatoire de Nova.", unlock: { type: "quest", value: 4 } },
  { id: "outfit-oak-guardian", name: "Armure du Chêne", slot: "outfit", rarity: "legendary", symbol: "🌳", description: "Une armure vivante offerte par Sylvarok après sa libération.", unlock: { type: "boss", value: 1 } },
  { id: "head-storm-crown", name: "Couronne de Tempête", slot: "head", rarity: "legendary", symbol: "⚡", description: "Elle crépite encore de l’énergie de Voltraxis.", unlock: { type: "boss", value: 2 } },
  { id: "companion-clockwork", name: "Mini-Mécanox", slot: "companion", rarity: "legendary", symbol: "🤖", description: "Un petit automate forgé par Kael à partir du noyau de la fabrique.", unlock: { type: "boss", value: 3 } },
  { id: "outfit-light-champion", name: "Armure du Champion de Lumière", slot: "outfit", rarity: "legendary", symbol: "🌟", description: "La tenue ultime des héros ayant vaincu l’Éclipse.", unlock: { type: "boss", value: 4 } },
];

export const starterItemIds = avatarCatalog.filter((item) => item.unlock.type === "starter").map((item) => item.id);
export const chestItems = avatarCatalog.filter((item) => item.unlock.type === "chest").sort((a, b) => a.unlock.value - b.unlock.value);

export function getEarnedItemIds(completedMissionCount: number) {
  return avatarCatalog
    .filter((item) => item.unlock.type === "starter" || (item.unlock.type === "missions" && completedMissionCount >= item.unlock.value))
    .map((item) => item.id);
}

export function findAvatarItem(id: string | null | undefined) {
  return avatarCatalog.find((item) => item.id === id);
}
