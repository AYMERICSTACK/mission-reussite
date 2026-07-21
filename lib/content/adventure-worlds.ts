import type { LearningTrack } from "@/lib/progress/types";

import type { CharacterExpression, CharacterId } from "@/components/illustrations/CharacterPortrait";
import type { WorldSceneId } from "@/components/illustrations/WorldScene";

export type AdventureStage = {
  id: string;
  name: string;
  description: string;
  symbol: string;
  character: string;
  characterSymbol: string;
  characterId: CharacterId;
  expression?: CharacterExpression;
  scene: string;
  objective: string;
  reward: string;
  unlockXp: number;
};

export type AdventureWorld = {
  id: string;
  eyebrow: string;
  name: string;
  chapter: string;
  story: string;
  openingLine: string;
  openingMessage: string;
  guideName: string;
  guideRole: string;
  guideSymbol: string;
  guideCharacterId: CharacterId;
  sceneId: WorldSceneId;
  companions: Array<{ name: string; role: string; symbol: string; characterId: CharacterId; expression?: CharacterExpression }>;
  stages: AdventureStage[];
};

export type WorldAtlasEntry = {
  id: string;
  order: number;
  name: string;
  subtitle: string;
  symbol: string;
  landscape: string;
  story: string;
  subjects: string[];
  guardian: { name: string; role: string; symbol: string; characterId: CharacterId; expression?: CharacterExpression };
  sceneId: WorldSceneId;
  treasure: string;
  unlockXp: number;
  available: boolean;
  active: boolean;
};

const worlds: Record<LearningTrack, AdventureWorld> = {
  alyssio: {
    id: "foret-mille-secrets",
    eyebrow: "Monde 1 · Chapitre 1",
    name: "La Forêt des Mille Secrets",
    chapter: "Le réveil du Grand Chêne",
    story: "Une lumière étrange s’est allumée au cœur de la forêt. Oscar pense que le Grand Chêne essaie de transmettre un message. Chaque quête réussie permet d’en révéler un nouveau morceau.",
    openingLine: "La forêt t’attend, Alyssio.",
    openingMessage: "Cette nuit, le Grand Chêne s’est illuminé pour la première fois depuis cent ans. Oscar a trouvé une feuille couverte de symboles, mais il a besoin de toi pour comprendre leur secret.",
    guideName: "Nova",
    guideRole: "Guide des explorateurs",
    guideSymbol: "✦",
    guideCharacterId: "nova",
    sceneId: "forest",
    companions: [
      { name: "Oscar", role: "Gardien des histoires", symbol: "🦉", characterId: "oscar", expression: "curious" },
      { name: "Luna", role: "Éclaireuse des énigmes", symbol: "🦊", characterId: "luna", expression: "proud" },
      { name: "Léo", role: "Messager de la forêt", symbol: "🐿️", characterId: "leo", expression: "happy" },
    ],
    stages: [
      { id: "sentier-feuilles", name: "Le sentier des feuilles", description: "Le début de l’aventure", symbol: "🍃", character: "Léo", characterSymbol: "🐿️", characterId: "leo", expression: "happy", scene: "Léo a retrouvé des traces dorées sur le sentier. Elles forment des mots qu’il faut lire avec attention pour savoir quelle direction prendre.", objective: "Retrouver le premier indice caché dans les mots.", reward: "La feuille dorée", unlockXp: 0 },
      { id: "riviere-chantante", name: "La rivière chantante", description: "Des indices se cachent dans les mots", symbol: "💧", character: "Oscar", characterSymbol: "🦉", characterId: "oscar", expression: "curious", scene: "La rivière répète des phrases mystérieuses. Oscar pense qu’en comprenant exactement ce qu’elles veulent dire, le passage apparaîtra.", objective: "Comprendre le message de la rivière.", reward: "La goutte de cristal", unlockXp: 100 },
      { id: "clairiere-lucioles", name: "La clairière des lucioles", description: "Les énigmes deviennent plus difficiles", symbol: "✨", character: "Luna", characterSymbol: "🦊", characterId: "luna", expression: "focused", scene: "Les lucioles dessinent des nombres et des phrases dans le ciel. Luna a besoin d’un esprit rapide pour remettre chaque lumière à sa place.", objective: "Résoudre les énigmes de la clairière.", reward: "La lanterne des lucioles", unlockXp: 220 },
      { id: "grand-chene", name: "Le Grand Chêne", description: "Le secret du chapitre", symbol: "🌳", character: "Nova", characterSymbol: "✦", characterId: "nova", expression: "proud", scene: "Les trois premiers trésors ouvrent un passage sous les racines. Le dernier message du Grand Chêne attend celui qui a su progresser sans abandonner.", objective: "Réunir les indices et révéler le secret du chapitre.", reward: "Le cœur du Grand Chêne", unlockXp: 360 },
    ],
  },
  leony: {
    id: "cite-horizons",
    eyebrow: "Monde 1 · Chapitre 1",
    name: "La Cité des Horizons",
    chapter: "Le code de la Tour d’Aube",
    story: "Les portes de la Tour d’Aube se sont refermées. Pour les rouvrir, il faut reconstruire un ancien code composé de savoirs, de méthode et de logique. Chaque quête apporte un nouveau fragment.",
    openingLine: "La Cité des Horizons a besoin de toi, Léony.",
    openingMessage: "Au lever du jour, la Tour d’Aube s’est figée et ses archives se sont dispersées dans la cité. Milo a retrouvé le premier fragment du code, mais seuls une méthode solide et un raisonnement précis permettront de réunir les autres.",
    guideName: "Nova",
    guideRole: "Guide de l’expédition",
    guideSymbol: "✦",
    guideCharacterId: "nova",
    sceneId: "city",
    companions: [
      { name: "Milo", role: "Archiviste de la cité", symbol: "📚", characterId: "milo", expression: "curious" },
      { name: "Sia", role: "Experte des langues", symbol: "🧭", characterId: "sia", expression: "proud" },
      { name: "Nox", role: "Gardien des défis", symbol: "⚙️", characterId: "nox", expression: "focused" },
    ],
    stages: [
      { id: "porte-idees", name: "La Porte des Idées", description: "Organiser et comprendre", symbol: "🔑", character: "Milo", characterSymbol: "📚", characterId: "milo", expression: "curious", scene: "La porte ne répond qu’aux consignes comprises avec précision. Milo a retrouvé plusieurs fragments, mais certains mots ont été mélangés.", objective: "Décoder les consignes pour ouvrir la première porte.", reward: "La clé des idées", unlockXp: 0 },
      { id: "archives-flottantes", name: "Les Archives flottantes", description: "Relier les connaissances", symbol: "📜", character: "Sia", characterSymbol: "🧭", characterId: "sia", expression: "focused", scene: "Des pages flottent au-dessus de la cité dans plusieurs langues. Sia doit les classer avant que le vent ne les emporte.", objective: "Relier les informations et retrouver leur ordre logique.", reward: "Le fragment des langues", unlockXp: 100 },
      { id: "pont-enigmes", name: "Le Pont des Énigmes", description: "Raisonner avec précision", symbol: "🌉", character: "Nox", characterSymbol: "⚙️", characterId: "nox", expression: "proud", scene: "Chaque dalle du pont porte un calcul ou une énigme. Une réponse imprécise fait disparaître le passage suivant.", objective: "Traverser le pont grâce à un raisonnement rigoureux.", reward: "Le rouage d’azur", unlockXp: 220 },
      { id: "tour-aube", name: "La Tour d’Aube", description: "Révéler le code du chapitre", symbol: "🏛️", character: "Nova", characterSymbol: "✦", characterId: "nova", expression: "proud", scene: "Les fragments réunis projettent un code sur la façade de la tour. Il reste une dernière étape pour rallumer sa lumière.", objective: "Assembler le code et achever le chapitre.", reward: "Le prisme de l’Aube", unlockXp: 360 },
    ],
  },
};

const futureWorlds: Omit<WorldAtlasEntry, "available" | "active">[] = [
  { id: "vallee-explorateurs", order: 2, name: "La Vallée des Explorateurs", subtitle: "Les chemins du nombre", symbol: "🏞️", landscape: "Prairies, moulins et chemins suspendus", story: "Les habitants de la vallée ont perdu les repères qui guidaient leurs récoltes. Pour remettre les chemins en mouvement, il faudra compter, comparer et repérer les bonnes stratégies.", subjects: ["Calcul mental", "Numération", "Logique"], guardian: { name: "Tiko", role: "Cartographe des nombres", symbol: "🦝", characterId: "tiko", expression: "curious" }, sceneId: "valley", treasure: "La boussole des nombres", unlockXp: 400 },
  { id: "royaume-montagnes", order: 3, name: "Le Royaume des Montagnes", subtitle: "L’ascension des énigmes", symbol: "⛰️", landscape: "Sommets, ponts de corde et cavernes", story: "Une ancienne route vers les sommets s’est effondrée. Chaque problème résolu reconstruit une portion du passage et rapproche l’explorateur de la forteresse des nuages.", subjects: ["Problèmes", "Raisonnement", "Grandeurs"], guardian: { name: "Maya", role: "Gardienne des sommets", symbol: "🦅", characterId: "maya", expression: "proud" }, sceneId: "mountain", treasure: "Le cristal des hauteurs", unlockXp: 850 },
  { id: "ocean-mysteres", order: 4, name: "L’Océan des Mystères", subtitle: "L’expédition des profondeurs", symbol: "🌊", landscape: "Îles oubliées, récifs et cité engloutie", story: "Sous les vagues, une bibliothèque engloutie conserve les secrets du vivant et de la matière. Il faudra observer, expérimenter et relier les indices pour l’atteindre.", subjects: ["Sciences", "Observation", "Découverte"], guardian: { name: "Nila", role: "Navigatrice des profondeurs", symbol: "🐬", characterId: "nila", expression: "happy" }, sceneId: "ocean", treasure: "La perle des savoirs", unlockXp: 1400 },
  { id: "desert-enigmes", order: 5, name: "Le Désert des Énigmes", subtitle: "Les archives du temps", symbol: "🏜️", landscape: "Dunes, temples et mécanismes anciens", story: "Le sable a recouvert les archives d’une civilisation disparue. Les textes, mesures et codes doivent être interprétés avec précision avant la prochaine tempête.", subjects: ["Français", "Mesures", "Méthode"], guardian: { name: "Siro", role: "Veilleur des archives", symbol: "🦎", characterId: "siro", expression: "focused" }, sceneId: "desert", treasure: "Le cadran du temps", unlockXp: 2000 },
  { id: "royaume-etoiles", order: 6, name: "Le Royaume des Étoiles", subtitle: "La grande constellation", symbol: "🌌", landscape: "Planètes, observatoires et routes célestes", story: "Toutes les routes de Mission Réussite convergent vers le ciel. Les ultimes défis mélangent les savoirs et révèlent la constellation propre à chaque aventurier.", subjects: ["Révisions", "Défis avancés", "Missions spéciales"], guardian: { name: "Nova", role: "Gardienne de la constellation", symbol: "✦", characterId: "nova", expression: "proud" }, sceneId: "stars", treasure: "L’étoile de la réussite", unlockXp: 2800 },
];

export function getAdventureWorld(track: LearningTrack, firstName?: string) {
  const world = worlds[track];
  if (!firstName) return world;
  const originalName = track === "alyssio" ? "Alyssio" : "Léony";
  return { ...world, openingLine: world.openingLine.replace(originalName, firstName), openingMessage: world.openingMessage.replace(originalName, firstName) };
}

export function getWorldAtlas(track: LearningTrack, totalXp: number): WorldAtlasEntry[] {
  const current = worlds[track];
  const first: WorldAtlasEntry = {
    id: current.id,
    order: 1,
    name: current.name,
    subtitle: current.chapter,
    symbol: track === "alyssio" ? "🌳" : "🏛️",
    landscape: track === "alyssio" ? "Sentiers secrets, rivières et clairières" : "Tours, archives et ponts suspendus",
    story: current.story,
    subjects: track === "alyssio" ? ["Lecture", "Compréhension", "Calcul"] : ["Méthode", "Français", "Mathématiques"],
    guardian: current.companions[0],
    sceneId: current.sceneId,
    treasure: current.stages.at(-1)?.reward ?? "Le trésor du monde",
    unlockXp: 0,
    available: true,
    active: true,
  };

  return [
    first,
    ...futureWorlds.map((world) => ({
      ...world,
      available: totalXp >= world.unlockXp,
      active: false,
    })),
  ];
}
