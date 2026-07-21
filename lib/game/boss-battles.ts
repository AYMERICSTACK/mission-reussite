export type BossPower = "roots" | "storm" | "machines" | "eclipse";

export type BossReward = {
  trophyId: string;
  trophyName: string;
  trophySymbol: string;
  itemId: string;
  chestName: string;
  coinReward: number;
  xpReward: number;
};

export type BossBattleConfig = {
  chapterSlug: string;
  name: string;
  title: string;
  symbol: string;
  power: BossPower;
  powerName: string;
  powerDescription: string;
  intro: string[];
  ending: string[];
  victory: string;
  defeat: string;
  attackName: string;
  reward: BossReward;
};

const BOSSES: Record<string, BossBattleConfig> = {
  "le-premier-gardien": {
    chapterSlug: "le-premier-gardien",
    name: "Sylvarok",
    title: "Gardien du Chêne",
    symbol: "🌳",
    power: "roots",
    powerName: "Armure de racines",
    powerDescription: "Ses racines réduisent les deux premières attaques. Les combos brisent son écorce.",
    intro: [
      "La Porte de la Forêt se referme dans un grondement.",
      "Sylvarok s’éveille au pied du Grand Chêne, prisonnier d’une armure de racines sombres.",
      "Enchaîne les bonnes réponses pour fissurer son écorce et libérer le gardien.",
    ],
    ending: [
      "La dernière racine d’ombre se détache de son armure.",
      "Sylvarok pose un genou au sol, puis le Grand Chêne illumine toute la forêt.",
      "Le gardien te confie le Sceau du Chêne et ouvre la route vers le Royaume des Échos.",
    ],
    victory: "Le Gardien du Chêne est libéré. La forêt reconnaît désormais ton courage.",
    defeat: "Les racines ont refermé le passage. Reprends ton souffle et brise leur défense avec un combo.",
    attackName: "Étreinte des racines",
    reward: { trophyId: "trophy-oak", trophyName: "Libérateur du Chêne", trophySymbol: "🌿", itemId: "outfit-oak-guardian", chestName: "Coffre légendaire de la Forêt", coinReward: 180, xpReward: 120 },
  },
  "le-gardien-de-la-tempete": {
    chapterSlug: "le-gardien-de-la-tempete",
    name: "Voltraxis",
    title: "Gardien de la Tempête",
    symbol: "⚡",
    power: "storm",
    powerName: "Foudre en chaîne",
    powerDescription: "Chaque deuxième erreur déclenche une riposte renforcée. La précision est ta meilleure défense.",
    intro: [
      "Le ciel se fend au-dessus du Royaume des Échos.",
      "Voltraxis rassemble la foudre autour de son armure et fait trembler la citadelle.",
      "Réponds avec précision pour charger ton énergie et retourner l’orage contre lui.",
    ],
    ending: [
      "Ton attaque traverse le cœur de l’orage.",
      "Les éclairs deviennent silencieux et Voltraxis abaisse enfin son marteau.",
      "Il t’offre l’Éclat de Tempête avant de disperser les nuages qui bloquaient l’horizon.",
    ],
    victory: "La tempête s’apaise. Voltraxis reconnaît ta maîtrise et ouvre la route.",
    defeat: "La foudre a été trop puissante cette fois. Observe, apprends et relance le combat.",
    attackName: "Foudre des Échos",
    reward: { trophyId: "trophy-storm", trophyName: "Maître de la Tempête", trophySymbol: "⚡", itemId: "head-storm-crown", chestName: "Coffre légendaire des Nuages", coinReward: 240, xpReward: 160 },
  },
  "les-machines-oubliees": {
    chapterSlug: "les-machines-oubliees",
    name: "Mécanox",
    title: "Gardien des Machines",
    symbol: "⚙️",
    power: "machines",
    powerName: "Blindage adaptatif",
    powerDescription: "Son blindage résiste aux coups isolés. Un combo de deux réponses ou un critique inflige tous les dégâts.",
    intro: [
      "Le cœur de la Fabrique Oubliée redémarre brutalement.",
      "Mécanox assemble son corps avec les engrenages de toute la salle.",
      "Construis des combos pour dépasser son blindage adaptatif et arrêter le programme central.",
    ],
    ending: [
      "Le dernier engrenage ralentit, puis le silence revient dans la fabrique.",
      "Mécanox projette une carte céleste avant que son armure ne se transforme en poussière lumineuse.",
      "Kael récupère son noyau et forge pour toi un compagnon mécanique unique.",
    ],
    victory: "Le programme central est désactivé. Les machines obéissent de nouveau à Kael.",
    defeat: "Le blindage s’est adapté à tes attaques. Construis un combo avant de frapper plus fort.",
    attackName: "Pulsion mécanique",
    reward: { trophyId: "trophy-machines", trophyName: "Dominateur des Machines", trophySymbol: "⚙️", itemId: "companion-clockwork", chestName: "Coffre légendaire de la Fabrique", coinReward: 300, xpReward: 200 },
  },
  "le-seigneur-de-l-ombre": {
    chapterSlug: "le-seigneur-de-l-ombre",
    name: "Nocthar",
    title: "Seigneur de l’Ombre",
    symbol: "🌑",
    power: "eclipse",
    powerName: "Éclipse totale",
    powerDescription: "Toutes les trois attaques, l’Éclipse absorbe une partie de ton énergie. Utilise ton critique sans attendre.",
    intro: [
      "La Tour de l’Éclipse tremble tandis que les six sceaux s’illuminent.",
      "Nocthar apparaît au-dessus du vide et rassemble toutes les ombres de la Saison 1.",
      "Tes connaissances, tes alliés et ton courage sont désormais tes armes les plus puissantes.",
    ],
    ending: [
      "Les quatre sceaux répondent à ton ultime attaque.",
      "Une fissure de lumière traverse l’Éclipse et libère les mondes emprisonnés.",
      "Oscar, Nova, Lyra, Kael et Orion te rejoignent : la Saison 1 est sauvée, mais une porte inconnue vient de s’ouvrir.",
    ],
    victory: "La lumière traverse la tour. L’Éclipse se dissipe et la Saison 1 est sauvée.",
    defeat: "L’Éclipse résiste encore. Ton équipe reste à tes côtés : relève-toi et recommence.",
    attackName: "Éclipse totale",
    reward: { trophyId: "trophy-shadow", trophyName: "Héros de la Lumière", trophySymbol: "🏆", itemId: "outfit-light-champion", chestName: "Coffre légendaire de l’Éclipse", coinReward: 500, xpReward: 350 },
  },
};

export function getBossBattle(chapterSlug?: string | null) {
  return chapterSlug ? BOSSES[chapterSlug] : undefined;
}
