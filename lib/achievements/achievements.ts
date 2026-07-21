import type { AttemptRecord, LearningTrack } from "@/lib/progress/types";
import { getHeroRank } from "@/lib/game/levels";

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";
export type AchievementCategory = "adventure" | "learning" | "mastery" | "streak" | "autonomy" | "heroism" | "collection";

export type AchievementGameStats = {
  bonusXp?: number;
  coins?: number;
  defeatedBossIds?: string[];
  bossTrophyIds?: string[];
  legendaryChestIds?: string[];
  unlockedItemIds?: string[];
  claimedSideQuests?: number;
  updatedAt?: string | Date | null;
};

export type AchievementDefinition = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  secretHint: string;
  rarity: AchievementRarity;
  category: AchievementCategory;
  target: number;
  metric: (context: AchievementContext) => number;
};

export type AchievementResult = Omit<AchievementDefinition, "metric"> & {
  unlocked: boolean;
  progress: number;
  progressPercent: number;
  unlockedAt: string | null;
};

export type TrophyCabinetItem = {
  id: string;
  symbol: string;
  name: string;
  description: string;
  obtained: boolean;
};

export type AchievementCollection = {
  achievements: AchievementResult[];
  unlocked: AchievementResult[];
  locked: AchievementResult[];
  recentUnlocks: AchievementResult[];
  unlockedCount: number;
  totalCount: number;
  completionPercent: number;
  totalXp: number;
  perfectMissions: number;
  currentStreak: number;
  bestStreak: number;
  totalCorrectAnswers: number;
  heroLevel: number;
  trophyCabinet: TrophyCabinetItem[];
};

type AchievementContext = {
  attempts: AttemptRecord[];
  track: LearningTrack;
  totalXp: number;
  perfectMissions: number;
  noHintMissions: number;
  uniqueMissionCount: number;
  categoryCounts: Map<string, number>;
  currentStreak: number;
  bestStreak: number;
  activeDays: number;
  totalCorrectAnswers: number;
  heroLevel: number;
  bossCount: number;
  trophyCount: number;
  legendaryChestCount: number;
  unlockedItemCount: number;
  claimedSideQuests: number;
  coins: number;
  gameUpdatedAt: string | null;
};

const TROPHY_CABINET: TrophyCabinetItem[] = [
  { id: "trophy-oak", symbol: "🌿", name: "Libérateur du Chêne", description: "Sylvarok a été libéré de ses racines sombres.", obtained: false },
  { id: "trophy-storm", symbol: "⚡", name: "Maître de la Tempête", description: "L’orage de Voltraxis s’est enfin apaisé.", obtained: false },
  { id: "trophy-machines", symbol: "⚙️", name: "Dominateur des Machines", description: "Le programme central de Mécanox a été arrêté.", obtained: false },
  { id: "trophy-shadow", symbol: "🏆", name: "Héros de la Lumière", description: "Nocthar et l’Éclipse ont été vaincus.", obtained: false },
];

const dayKey = (value: string | Date) => new Intl.DateTimeFormat("fr-CA", {
  timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date(value));

function streaks(attempts: AttemptRecord[]) {
  const days = [...new Set(attempts.map((attempt) => dayKey(attempt.completedAt)))].sort();
  let best = 0;
  let run = 0;
  let previous: Date | null = null;
  for (const key of days) {
    const current = new Date(`${key}T12:00:00Z`);
    const delta = previous ? Math.round((current.getTime() - previous.getTime()) / 86_400_000) : 1;
    run = delta === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = current;
  }
  const set = new Set(days);
  const cursor = new Date();
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let current = 0;
  while (set.has(dayKey(cursor))) { current += 1; cursor.setDate(cursor.getDate() - 1); }
  return { current, best, activeDays: days.length };
}

function categoryCount(context: AchievementContext, words: string[]) {
  let count = 0;
  for (const [category, value] of context.categoryCounts) {
    if (words.some((word) => category.includes(word))) count += value;
  }
  return count;
}

export const achievementLibrary: AchievementDefinition[] = [
  { id: "first-step", name: "Premier pas", symbol: "👣", description: "Une première mission accomplie : l’aventure commence.", secretHint: "Termine ta première mission.", rarity: "common", category: "adventure", target: 1, metric: c => c.attempts.length },
  { id: "mission-five", name: "Aventurier curieux", symbol: "🧭", description: "Cinq missions terminées avec courage.", secretHint: "Termine 5 missions.", rarity: "common", category: "adventure", target: 5, metric: c => c.attempts.length },
  { id: "mission-twenty", name: "Explorateur confirmé", symbol: "🗺️", description: "Vingt missions ont enrichi ton carnet d’aventure.", secretHint: "Termine 20 missions.", rarity: "epic", category: "adventure", target: 20, metric: c => c.attempts.length },
  { id: "mission-fifty", name: "Grand voyageur", symbol: "🌍", description: "Cinquante missions accomplies à travers les royaumes.", secretHint: "Termine 50 missions.", rarity: "legendary", category: "adventure", target: 50, metric: c => c.attempts.length },
  { id: "reader", name: "Lecteur curieux", symbol: "📚", description: "Trois quêtes de lecture ou de compréhension réussies.", secretHint: "Termine 3 missions de lecture.", rarity: "rare", category: "learning", target: 3, metric: c => categoryCount(c, ["lecture", "compréhension"]) },
  { id: "math-spark", name: "Étincelle des nombres", symbol: "➕", description: "Trois défis de mathématiques ou de calcul terminés.", secretHint: "Termine 3 missions de mathématiques.", rarity: "rare", category: "learning", target: 3, metric: c => categoryCount(c, ["math", "calcul", "problème"]) },
  { id: "word-detective", name: "Détective des mots", symbol: "🔎", description: "Trois missions de français, grammaire ou conjugaison terminées.", secretHint: "Explore 3 missions autour des mots.", rarity: "rare", category: "learning", target: 3, metric: c => categoryCount(c, ["français", "grammaire", "conjugaison"]) },
  { id: "correct-fifty", name: "Esprit affûté", symbol: "🎯", description: "Cinquante bonnes réponses données au cours de l’aventure.", secretHint: "Donne 50 bonnes réponses.", rarity: "rare", category: "learning", target: 50, metric: c => c.totalCorrectAnswers },
  { id: "correct-two-hundred", name: "Sage des réponses", symbol: "🧠", description: "Deux cents réponses justes : ton savoir rayonne.", secretHint: "Donne 200 bonnes réponses.", rarity: "legendary", category: "learning", target: 200, metric: c => c.totalCorrectAnswers },
  { id: "perfect-one", name: "Mission parfaite", symbol: "⭐", description: "Une mission terminée sans aucune erreur.", secretHint: "Réussis une mission sans erreur.", rarity: "rare", category: "mastery", target: 1, metric: c => c.perfectMissions },
  { id: "perfect-five", name: "Maîtrise éclatante", symbol: "💫", description: "Cinq missions parfaites : précision remarquable.", secretHint: "Réussis 5 missions sans erreur.", rarity: "epic", category: "mastery", target: 5, metric: c => c.perfectMissions },
  { id: "xp-500", name: "Gardien des 500 étoiles", symbol: "🌟", description: "Cinq cents points d’expérience rassemblés.", secretHint: "Atteins 500 XP.", rarity: "epic", category: "mastery", target: 500, metric: c => c.totalXp },
  { id: "level-five", name: "Héros en devenir", symbol: "⚔️", description: "Le niveau 5 est atteint : ton héros prend de l’assurance.", secretHint: "Atteins le niveau 5.", rarity: "rare", category: "mastery", target: 5, metric: c => c.heroLevel },
  { id: "level-ten", name: "Champion des royaumes", symbol: "👑", description: "Le niveau 10 consacre un véritable champion.", secretHint: "Atteins le niveau 10.", rarity: "legendary", category: "mastery", target: 10, metric: c => c.heroLevel },
  { id: "autonomous", name: "Esprit autonome", symbol: "🪶", description: "Trois missions menées sans demander d’indice.", secretHint: "Termine 3 missions sans indice.", rarity: "rare", category: "autonomy", target: 3, metric: c => c.noHintMissions },
  { id: "autonomous-ten", name: "Guide de soi-même", symbol: "🕯️", description: "Dix missions réussies sans aucun indice.", secretHint: "Termine 10 missions sans indice.", rarity: "epic", category: "autonomy", target: 10, metric: c => c.noHintMissions },
  { id: "streak-three", name: "Héros du rythme", symbol: "🔥", description: "Trois jours d’aventure consécutifs.", secretHint: "Joue pendant 3 jours de suite.", rarity: "rare", category: "streak", target: 3, metric: c => c.bestStreak },
  { id: "streak-seven", name: "Flamme légendaire", symbol: "🌋", description: "Sept jours consécutifs : une régularité exceptionnelle.", secretHint: "Maintiens une série de 7 jours.", rarity: "legendary", category: "streak", target: 7, metric: c => c.bestStreak },
  { id: "first-boss", name: "Briseur de gardien", symbol: "🗡️", description: "Un premier boss a été vaincu au terme d’un combat héroïque.", secretHint: "Remporte ton premier combat de boss.", rarity: "epic", category: "heroism", target: 1, metric: c => c.bossCount },
  { id: "all-bosses", name: "Sauveur de la Saison 1", symbol: "🏆", description: "Les quatre grands ennemis de la Saison 1 ont été vaincus.", secretHint: "Vaincs les 4 boss uniques.", rarity: "legendary", category: "heroism", target: 4, metric: c => c.bossCount },
  { id: "legendary-chests", name: "Ouvreur de légendes", symbol: "🧰", description: "Deux coffres légendaires ont révélé leurs secrets.", secretHint: "Ouvre 2 coffres légendaires.", rarity: "epic", category: "heroism", target: 2, metric: c => c.legendaryChestCount },
  { id: "side-quest-three", name: "Ami du village", symbol: "🏡", description: "Trois quêtes secondaires récompensées par les habitants.", secretHint: "Réclame 3 récompenses de quêtes secondaires.", rarity: "epic", category: "heroism", target: 3, metric: c => c.claimedSideQuests },
  { id: "items-five", name: "Petit collectionneur", symbol: "🎒", description: "Cinq objets différents enrichissent désormais ton inventaire.", secretHint: "Débloque 5 objets d’avatar.", rarity: "common", category: "collection", target: 5, metric: c => c.unlockedItemCount },
  { id: "items-fifteen", name: "Cabinet des merveilles", symbol: "💎", description: "Quinze objets ont été réunis dans une collection remarquable.", secretHint: "Débloque 15 objets d’avatar.", rarity: "legendary", category: "collection", target: 15, metric: c => c.unlockedItemCount },
  { id: "trophies-two", name: "Galerie héroïque", symbol: "🏅", description: "Deux trophées de boss brillent dans la galerie.", secretHint: "Obtiens 2 trophées de boss.", rarity: "epic", category: "collection", target: 2, metric: c => c.trophyCount },
  { id: "coins-five-hundred", name: "Trésorier du village", symbol: "🪙", description: "Cinq cents pièces ont été accumulées au fil des aventures.", secretHint: "Possède 500 pièces.", rarity: "rare", category: "collection", target: 500, metric: c => c.coins },
];

function buildContext(attempts: AttemptRecord[], track: LearningTrack, game: AchievementGameStats = {}): AchievementContext {
  const categoryCounts = new Map<string, number>();
  attempts.forEach((attempt) => {
    const key = attempt.category.toLowerCase();
    categoryCounts.set(key, (categoryCounts.get(key) ?? 0) + 1);
  });
  const streak = streaks(attempts);
  const attemptXp = attempts.reduce((sum, attempt) => sum + attempt.xp, 0);
  const totalXp = attemptXp + Math.max(0, game.bonusXp ?? 0);
  return {
    attempts, track, totalXp,
    perfectMissions: attempts.filter(a => a.mistakes === 0 && a.correctAnswers === a.totalQuestions).length,
    noHintMissions: attempts.filter(a => a.hintsUsed === 0).length,
    uniqueMissionCount: new Set(attempts.map(a => a.missionId)).size,
    categoryCounts,
    currentStreak: streak.current,
    bestStreak: streak.best,
    activeDays: streak.activeDays,
    totalCorrectAnswers: attempts.reduce((sum, attempt) => sum + attempt.correctAnswers, 0),
    heroLevel: getHeroRank(totalXp).level,
    bossCount: new Set(game.defeatedBossIds ?? []).size,
    trophyCount: new Set(game.bossTrophyIds ?? []).size,
    legendaryChestCount: new Set(game.legendaryChestIds ?? []).size,
    unlockedItemCount: new Set(game.unlockedItemIds ?? []).size,
    claimedSideQuests: Math.max(0, game.claimedSideQuests ?? 0),
    coins: Math.max(0, game.coins ?? 0),
    gameUpdatedAt: game.updatedAt ? new Date(game.updatedAt).toISOString() : null,
  };
}

function unlockDate(definition: AchievementDefinition, attempts: AttemptRecord[], track: LearningTrack, game: AchievementGameStats) {
  const chronological = [...attempts].sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  for (let index = 0; index < chronological.length; index += 1) {
    const partial = buildContext(chronological.slice(0, index + 1), track, { ...game, bonusXp: 0, defeatedBossIds: [], bossTrophyIds: [], legendaryChestIds: [], unlockedItemIds: [], claimedSideQuests: 0, coins: 0 });
    if (definition.metric(partial) >= definition.target) return chronological[index].completedAt;
  }
  return game.updatedAt ? new Date(game.updatedAt).toISOString() : null;
}

export function buildAchievementCollection(attempts: AttemptRecord[], track: LearningTrack, game: AchievementGameStats = {}): AchievementCollection {
  const context = buildContext(attempts, track, game);
  const achievements = achievementLibrary.map((definition): AchievementResult => {
    const progress = Math.min(definition.target, Math.max(0, definition.metric(context)));
    const unlocked = progress >= definition.target;
    const { metric: _metric, ...serializableDefinition } = definition;

    return {
      ...serializableDefinition,
      unlocked,
      progress,
      progressPercent: Math.round((progress / definition.target) * 100),
      unlockedAt: unlocked ? unlockDate(definition, attempts, track, game) : null,
    };
  });
  const unlocked = achievements.filter(item => item.unlocked).sort((a, b) => (b.unlockedAt ?? "").localeCompare(a.unlockedAt ?? ""));
  const trophyIds = new Set(game.bossTrophyIds ?? []);
  return {
    achievements,
    unlocked,
    locked: achievements.filter(item => !item.unlocked),
    recentUnlocks: unlocked.slice(0, 3),
    unlockedCount: unlocked.length,
    totalCount: achievements.length,
    completionPercent: Math.round((unlocked.length / achievements.length) * 100),
    totalXp: context.totalXp,
    perfectMissions: context.perfectMissions,
    currentStreak: context.currentStreak,
    bestStreak: context.bestStreak,
    totalCorrectAnswers: context.totalCorrectAnswers,
    heroLevel: context.heroLevel,
    trophyCabinet: TROPHY_CABINET.map((trophy) => ({ ...trophy, obtained: trophyIds.has(trophy.id) })),
  };
}
