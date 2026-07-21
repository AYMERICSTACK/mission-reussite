import type { LearningMission } from "@/lib/content/missions";
import {
  buildKnowledgeGraphMastery,
  getKnowledgeNode,
  getPrerequisiteReadiness,
  type KnowledgeSkillMastery,
} from "@/lib/pedagogy/knowledge-graph";
import { getDiagnosticPrioritySkillIds } from "@/lib/pedagogy/learning-diagnostics";
import { getLearningPlanPrioritySkillIds } from "@/lib/pedagogy/learning-plan";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";
import { buildAdaptiveLearningProfile } from "@/lib/pedagogy/adaptive-learning";

export type MissionRecommendation = {
  mission: LearningMission;
  reason: string;
  status: "ready" | "done";
};

function parisDateKey(date: Date) {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function hash(value: string) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function recommendationReason(mission: LearningMission, profile: KnowledgeSkillMastery | undefined, prerequisiteMissing: string[]) {
  if (prerequisiteMissing.length) return `Pré-requis : ${prerequisiteMissing[0]}`;
  if (!profile) return "Nouvelle notion";
  if (profile.status === "fragile") return profile.trend === "up" ? "En progrès" : "À renforcer";
  if (profile.status === "discovery") return "À découvrir";
  if (profile.status === "progressing") return profile.trend === "down" ? "À consolider" : "Progression en cours";
  if (mission.difficulty >= 3) return "Étape suivante";
  return "Révision utile";
}

export function recommendDailyMissions({ child, missions, attempts, date = new Date(), count = 3 }: {
  child: ChildKey;
  missions: LearningMission[];
  attempts: AttemptRecord[];
  date?: Date;
  count?: number;
}): MissionRecommendation[] {
  const today = parisDateKey(date);
  const completedToday = new Set(attempts.filter((attempt) => parisDateKey(new Date(attempt.completedAt)) === today).map((attempt) => attempt.missionId));
  const previousAttempts = attempts.filter((attempt) => parisDateKey(new Date(attempt.completedAt)) < today);
  const profiles = buildKnowledgeGraphMastery(previousAttempts);
  const profilesById = new Map(profiles.map((profile) => [profile.skillId, profile]));
  const diagnosticPrioritySkills = getDiagnosticPrioritySkillIds(child, previousAttempts);
  const learningPlanSkills = getLearningPlanPrioritySkillIds(child, previousAttempts);
  const adaptiveProfile = buildAdaptiveLearningProfile(child, previousAttempts, date);
  const adaptiveBySkill = new Map(adaptiveProfile.skills.map((item) => [item.skillId, item]));

  if (missions.length <= count) {
    return missions.map((mission) => ({
      mission,
      reason: recommendationReason(mission, profilesById.get(mission.skillId), []),
      status: completedToday.has(mission.id) ? "done" : "ready",
    }));
  }

  const missionAttempts = new Map<string, AttemptRecord[]>();
  previousAttempts.forEach((attempt) => missionAttempts.set(attempt.missionId, [...(missionAttempts.get(attempt.missionId) ?? []), attempt]));
  const recentMissionIds = new Set(previousAttempts.slice(0, 5).map((attempt) => attempt.missionId));
  const seed = hash(`${child}-${today}`);

  const scored = missions.map((mission) => {
    const profile = profilesById.get(mission.skillId);
    const previousForMission = missionAttempts.get(mission.id) ?? [];
    const mastery = profile?.value ?? 0;
    const readiness = getPrerequisiteReadiness(mission.skillId, profiles);
    const node = getKnowledgeNode(mission.skillId);
    const adaptive = adaptiveBySkill.get(mission.skillId);
    let score = 0;

    if (!profile) score += 38;
    else if (profile.status === "fragile") score += 68;
    else if (profile.status === "discovery") score += 54;
    else if (profile.status === "progressing") score += 42;
    else score += 18;

    if (!readiness.ready) score -= 34 * (1 - readiness.ratio);
    else if (node?.prerequisites.length) score += 10;
    if (diagnosticPrioritySkills.has(mission.skillId)) score += 24;
    if (learningPlanSkills.has(mission.skillId)) score += 12;
    if (adaptive?.needsRevision) score += 30;
    if (profile?.trend === "down") score += 18;
    if (profile?.trend === "up" && profile.status !== "mastered") score += 8;
    if (previousForMission.length === 0) score += 28;
    score -= Math.min(previousForMission.length * 7, 28);
    if (recentMissionIds.has(mission.id)) score -= 36;

    const expectedDifficulty = adaptive?.targetDifficulty ?? (!profile ? adaptiveProfile.targetDifficulty : mastery >= 85 && profile.attempts >= 2 ? 4 : mastery < 60 ? 2 : 3);
    score -= Math.abs(mission.difficulty - expectedDifficulty) * 8;
    score += (hash(`${seed}-${mission.id}`) % 1000) / 1000;

    return { mission, score, profile, readiness };
  }).sort((a, b) => b.score - a.score);

  const selected: typeof scored = [];
  const selectedSkills = new Set<string>();
  const selectedSubjects = new Set<string>();

  // First pass: maximize subject and notion diversity.
  for (const candidate of scored) {
    const subject = getKnowledgeNode(candidate.mission.skillId)?.subject ?? candidate.mission.category;
    if (!selectedSkills.has(candidate.mission.skillId) && !selectedSubjects.has(subject)) {
      selected.push(candidate);
      selectedSkills.add(candidate.mission.skillId);
      selectedSubjects.add(subject);
    }
    if (selected.length === count) break;
  }
  for (const candidate of scored) {
    if (!selectedSkills.has(candidate.mission.skillId)) {
      selected.push(candidate);
      selectedSkills.add(candidate.mission.skillId);
    }
    if (selected.length === count) break;
  }
  for (const candidate of scored) {
    if (!selected.some((item) => item.mission.id === candidate.mission.id)) selected.push(candidate);
    if (selected.length === count) break;
  }

  return selected.map(({ mission, profile, readiness }) => ({
    mission,
    reason: adaptiveBySkill.get(mission.skillId)?.needsRevision ? "Révision au bon moment" : recommendationReason(mission, profile, readiness.missing.map((item) => item.label)),
    status: completedToday.has(mission.id) ? "done" : "ready",
  }));
}
