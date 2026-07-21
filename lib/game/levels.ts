export type HeroRank = {
  level: number;
  title: string;
  symbol: string;
  totalXp: number;
  levelStartXp: number;
  nextLevelXp: number;
  xpInLevel: number;
  xpNeeded: number;
  percent: number;
  reward: string;
};

const levelTitles = [
  "Apprenti explorateur",
  "Éclaireur curieux",
  "Aventurier courageux",
  "Gardien des savoirs",
  "Héros des royaumes",
  "Maître des énigmes",
  "Champion de la lumière",
  "Légende de Mission Réussite",
];

const levelSymbols = ["🌱", "🧭", "⚔️", "🛡️", "✨", "🧠", "👑", "🏆"];
const levelRewards = [
  "Ton aventure commence",
  "Nouveau titre d’aventurier",
  "Aura de courage débloquée",
  "Emblème du gardien",
  "Éclat héroïque",
  "Sceau du maître",
  "Couronne de champion",
  "Titre légendaire",
];

export function xpRequiredForLevel(level: number) {
  return 80 + Math.max(0, level - 1) * 30;
}

export function totalXpAtLevel(level: number) {
  let total = 0;
  for (let current = 1; current < Math.max(1, level); current += 1) {
    total += xpRequiredForLevel(current);
  }
  return total;
}

export function getHeroRank(totalXp: number): HeroRank {
  const safeXp = Math.max(0, Math.floor(totalXp));
  let level = 1;
  let levelStartXp = 0;
  let xpNeeded = xpRequiredForLevel(level);

  while (safeXp >= levelStartXp + xpNeeded && level < 50) {
    levelStartXp += xpNeeded;
    level += 1;
    xpNeeded = xpRequiredForLevel(level);
  }

  const xpInLevel = safeXp - levelStartXp;
  const titleIndex = Math.min(levelTitles.length - 1, Math.floor((level - 1) / 3));

  return {
    level,
    title: levelTitles[titleIndex],
    symbol: levelSymbols[titleIndex],
    totalXp: safeXp,
    levelStartXp,
    nextLevelXp: levelStartXp + xpNeeded,
    xpInLevel,
    xpNeeded,
    percent: Math.min(100, Math.round((xpInLevel / Math.max(1, xpNeeded)) * 100)),
    reward: levelRewards[titleIndex],
  };
}

export function getLevelUpResult(totalXpBefore: number, earnedXp: number) {
  const before = getHeroRank(totalXpBefore);
  const after = getHeroRank(totalXpBefore + Math.max(0, earnedXp));
  return { before, after, leveledUp: after.level > before.level };
}
