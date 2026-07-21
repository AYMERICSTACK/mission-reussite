import { buildKnowledgeGraphMastery, resolveAttemptSkillId } from "@/lib/pedagogy/knowledge-graph";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";

export type AdaptivePace = "gentle" | "balanced" | "challenge";
export type AdaptiveHintMode = "guided" | "progressive" | "minimal";

export type AdaptiveSkillProfile = {
  skillId: string;
  mastery: number;
  confidence: number;
  targetDifficulty: 1 | 2 | 3 | 4 | 5;
  pace: AdaptivePace;
  hintMode: AdaptiveHintMode;
  needsRevision: boolean;
  reason: string;
};

export type AdaptiveLearningProfile = {
  child: ChildKey;
  pace: AdaptivePace;
  hintMode: AdaptiveHintMode;
  targetDifficulty: 1 | 2 | 3 | 4 | 5;
  confidence: number;
  revisionSkillIds: string[];
  strengths: string[];
  message: string;
  skills: AdaptiveSkillProfile[];
};

const DAY = 86_400_000;

function clampDifficulty(value: number): 1 | 2 | 3 | 4 | 5 {
  return Math.max(1, Math.min(5, Math.round(value))) as 1 | 2 | 3 | 4 | 5;
}

function recentPerformance(attempts: AttemptRecord[]) {
  const recent = attempts.slice(0, 8);
  if (!recent.length) return { success: 0.65, hints: 0, mistakes: 0, speed: 1 };
  const answers = recent.reduce((sum, item) => sum + Math.max(1, item.totalQuestions), 0);
  const success = recent.reduce((sum, item) => sum + item.correctAnswers, 0) / answers;
  const hints = recent.reduce((sum, item) => sum + item.hintsUsed, 0) / recent.length;
  const mistakes = recent.reduce((sum, item) => sum + item.mistakes, 0) / recent.length;
  const secondsPerQuestion = recent.reduce((sum, item) => sum + item.durationSeconds / Math.max(1, item.totalQuestions), 0) / recent.length;
  return { success, hints, mistakes, speed: secondsPerQuestion };
}

export function buildAdaptiveLearningProfile(child: ChildKey, attempts: AttemptRecord[], now = new Date()): AdaptiveLearningProfile {
  const sorted = [...attempts].sort((a, b) => b.completedAt.localeCompare(a.completedAt));
  const mastery = buildKnowledgeGraphMastery(sorted);
  const performance = recentPerformance(sorted);
  const pace: AdaptivePace = performance.success >= 0.88 && performance.hints < 0.6
    ? "challenge"
    : performance.success < 0.68 || performance.mistakes > 1.4
      ? "gentle"
      : "balanced";
  const hintMode: AdaptiveHintMode = pace === "gentle" ? "guided" : pace === "challenge" ? "minimal" : "progressive";
  const baseDifficulty = pace === "challenge" ? 4 : pace === "gentle" ? 2 : 3;

  const attemptsBySkill = new Map<string, AttemptRecord[]>();
  sorted.forEach((attempt) => {
    const skillId = resolveAttemptSkillId(attempt);
    if (skillId) attemptsBySkill.set(skillId, [...(attemptsBySkill.get(skillId) ?? []), attempt]);
  });

  const skills = mastery.map((skill): AdaptiveSkillProfile => {
    const related = attemptsBySkill.get(skill.skillId) ?? [];
    const latest = related[0];
    const ageDays = latest ? Math.floor((now.getTime() - new Date(latest.completedAt).getTime()) / DAY) : 999;
    const needsRevision = related.length > 0 && (ageDays >= (skill.value >= 80 ? 14 : 5) || skill.trend === "down");
    const targetDifficulty = clampDifficulty(skill.value >= 85 && skill.confidence >= 60 ? 4 : skill.value < 55 ? 2 : 3);
    const skillPace: AdaptivePace = skill.value >= 82 && skill.trend !== "down" ? "challenge" : skill.value < 58 || skill.trend === "down" ? "gentle" : "balanced";
    return {
      skillId: skill.skillId,
      mastery: skill.value,
      confidence: skill.confidence,
      targetDifficulty,
      pace: skillPace,
      hintMode: skillPace === "gentle" ? "guided" : skillPace === "challenge" ? "minimal" : "progressive",
      needsRevision,
      reason: needsRevision ? "Révision espacée utile" : skillPace === "gentle" ? "Consolidation guidée" : skillPace === "challenge" ? "Défi supérieur" : "Progression régulière",
    };
  });

  const revisionSkillIds = skills.filter((skill) => skill.needsRevision).sort((a, b) => a.mastery - b.mastery).map((skill) => skill.skillId);
  const strengths = mastery.filter((skill) => skill.value >= 80 && skill.confidence >= 45).sort((a, b) => b.value - a.value).slice(0, 3).map((skill) => skill.skillId);
  const confidence = mastery.length ? Math.round(mastery.reduce((sum, skill) => sum + skill.confidence, 0) / mastery.length) : 0;
  const message = !sorted.length
    ? "Le parcours va observer les premières réponses pour trouver le bon rythme."
    : pace === "gentle"
      ? "Le parcours ralentit légèrement, propose davantage d’indices et consolide les bases."
      : pace === "challenge"
        ? "Le parcours augmente doucement la difficulté et espace les aides."
        : "Le parcours alterne découverte, entraînement et révisions au bon moment.";

  return { child, pace, hintMode, targetDifficulty: clampDifficulty(baseDifficulty), confidence, revisionSkillIds, strengths, message, skills };
}

export function getAdaptiveSettingsForSkill(profile: AdaptiveLearningProfile, skillId: string): AdaptiveSkillProfile {
  return profile.skills.find((skill) => skill.skillId === skillId) ?? {
    skillId,
    mastery: 0,
    confidence: profile.confidence,
    targetDifficulty: profile.targetDifficulty,
    pace: profile.pace,
    hintMode: profile.hintMode,
    needsRevision: false,
    reason: "Observation du niveau",
  };
}
