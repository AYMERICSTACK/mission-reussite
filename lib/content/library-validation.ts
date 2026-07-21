import type { LearningMission } from "@/lib/content/missions";
import type { LibraryContentType, LibraryCoverage } from "@/lib/content/library-types";
import { knowledgeNodes } from "@/lib/pedagogy/knowledge-graph";

export type LibraryValidationIssue = { level: "error" | "warning"; missionId?: string; message: string };
export type LibraryValidationReport = { valid: boolean; issues: LibraryValidationIssue[]; coverage: LibraryCoverage };

const TYPES: LibraryContentType[] = ["story", "problem", "exercise", "challenge", "game"];

export function getLibraryCoverage(missions: LearningMission[]): LibraryCoverage {
  const bySkill: Record<string, number> = {};
  const byDifficulty: Record<number, number> = {};
  const byType = Object.fromEntries(TYPES.map((type) => [type, 0])) as Record<LibraryContentType, number>;
  const byChild: Record<string, number> = { alyssio: 0, leony: 0 };
  for (const mission of missions) {
    byChild[mission.child] = (byChild[mission.child] ?? 0) + 1;
    bySkill[mission.skillId] = (bySkill[mission.skillId] ?? 0) + 1;
    byDifficulty[mission.difficulty] = (byDifficulty[mission.difficulty] ?? 0) + 1;
    byType[mission.contentType ?? "exercise"] += 1;
  }
  return { total: missions.length, byChild, byType, bySkill, byDifficulty };
}

export function validateMissionLibrary(missions: LearningMission[]): LibraryValidationReport {
  const issues: LibraryValidationIssue[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const skills = new Set(knowledgeNodes.map((node) => node.id));

  for (const mission of missions) {
    if (ids.has(mission.id)) issues.push({ level: "error", missionId: mission.id, message: "Identifiant dupliqué." });
    ids.add(mission.id);
    if (slugs.has(`${mission.child}:${mission.slug}`)) issues.push({ level: "error", missionId: mission.id, message: "Slug dupliqué pour cet enfant." });
    slugs.add(`${mission.child}:${mission.slug}`);
    if (!skills.has(mission.skillId)) issues.push({ level: "error", missionId: mission.id, message: `Compétence inconnue : ${mission.skillId}.` });
    if (!mission.steps.length) issues.push({ level: "error", missionId: mission.id, message: "Aucune étape pédagogique." });
    if (!mission.objective.trim()) issues.push({ level: "error", missionId: mission.id, message: "Objectif pédagogique manquant." });
    mission.steps.forEach((step, stepIndex) => {
      if (!step.choices.some((choice) => choice.value === step.answer)) issues.push({ level: "error", missionId: mission.id, message: `Étape ${stepIndex + 1} : réponse absente des choix.` });
      if (step.choices.length < 2) issues.push({ level: "warning", missionId: mission.id, message: `Étape ${stepIndex + 1} : moins de deux choix.` });
    });
  }

  return { valid: !issues.some((issue) => issue.level === "error"), issues, coverage: getLibraryCoverage(missions) };
}
