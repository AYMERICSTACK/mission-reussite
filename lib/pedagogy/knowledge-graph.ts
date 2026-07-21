import { learningMissions } from "@/lib/content/missions";
import { buildSkillMastery, type SkillMastery } from "@/lib/pedagogy/skill-mastery";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";

export type KnowledgeSubject = "Français" | "Mathématiques" | "Anglais" | "Méthode & organisation";

export type KnowledgeNode = {
  id: string;
  child: ChildKey;
  label: string;
  subject: KnowledgeSubject;
  domain: string;
  level: string;
  description: string;
  prerequisites: string[];
  nextSkills: string[];
};

export type KnowledgeSkillMastery = SkillMastery & {
  skillId: string;
  subject: KnowledgeSubject;
  domain: string;
  level: string;
  description: string;
  prerequisites: Array<{ id: string; label: string; mastered: boolean }>;
  nextSkills: Array<{ id: string; label: string }>;
  path: string[];
};

export const knowledgeNodes: KnowledgeNode[] = [
  { id: "ce2-reading-explicit", child: "alyssio", label: "Informations explicites", subject: "Français", domain: "Lecture", level: "CE2", description: "Repérer une information directement écrite dans un texte.", prerequisites: [], nextSkills: ["ce2-reading-inference", "ce2-reading-message"] },
  { id: "ce2-reading-inference", child: "alyssio", label: "Inférences", subject: "Français", domain: "Lecture", level: "CE2", description: "Relier plusieurs indices pour comprendre ce qui n’est pas écrit directement.", prerequisites: ["ce2-reading-explicit"], nextSkills: ["ce2-reading-message"] },
  { id: "ce2-reading-message", child: "alyssio", label: "Sens global d’un récit", subject: "Français", domain: "Lecture", level: "CE2", description: "Comprendre l’idée principale et l’intention d’un personnage.", prerequisites: ["ce2-reading-explicit", "ce2-reading-inference"], nextSkills: [] },
  { id: "ce2-number-complements", child: "alyssio", label: "Compléments à 10", subject: "Mathématiques", domain: "Calcul", level: "CE2", description: "Utiliser les compléments à 10 pour calculer plus vite.", prerequisites: [], nextSkills: ["ce2-mental-calculation", "ce2-subtraction-strategies"] },
  { id: "ce2-mental-calculation", child: "alyssio", label: "Calcul mental", subject: "Mathématiques", domain: "Calcul", level: "CE2", description: "Choisir une stratégie rapide pour additionner, soustraire ou multiplier.", prerequisites: ["ce2-number-complements"], nextSkills: ["ce2-problem-subtraction"] },
  { id: "ce2-subtraction-strategies", child: "alyssio", label: "Soustractions", subject: "Mathématiques", domain: "Calcul", level: "CE2", description: "Calculer et vérifier une soustraction avec plusieurs stratégies.", prerequisites: ["ce2-number-complements"], nextSkills: ["ce2-problem-subtraction"] },
  { id: "ce2-problem-subtraction", child: "alyssio", label: "Problèmes de soustraction", subject: "Mathématiques", domain: "Résolution de problèmes", level: "CE2", description: "Identifier une situation de retrait et choisir la bonne opération.", prerequisites: ["ce2-subtraction-strategies"], nextSkills: [] },
  { id: "ce2-word-classes", child: "alyssio", label: "Nature des mots", subject: "Français", domain: "Grammaire", level: "CE2", description: "Reconnaître un nom, un verbe et un adjectif.", prerequisites: [], nextSkills: ["ce2-present-conjugation"] },
  { id: "ce2-present-conjugation", child: "alyssio", label: "Présent des verbes en -er", subject: "Français", domain: "Conjugaison", level: "CE2", description: "Accorder un verbe du premier groupe avec son sujet.", prerequisites: ["ce2-word-classes"], nextSkills: [] },
  { id: "ce2-vocabulary-relations", child: "alyssio", label: "Relations entre les mots", subject: "Français", domain: "Vocabulaire", level: "CE2", description: "Identifier des synonymes et des mots d’une même famille.", prerequisites: [], nextSkills: [] },

  { id: "sixth-instruction-verbs", child: "leony", label: "Verbes de consigne", subject: "Méthode & organisation", domain: "Méthodologie", level: "6e", description: "Identifier les actions demandées dans une consigne complexe.", prerequisites: [], nextSkills: ["sixth-task-planning"] },
  { id: "sixth-task-planning", child: "leony", label: "Planification du travail", subject: "Méthode & organisation", domain: "Organisation", level: "6e", description: "Découper et planifier un travail scolaire réaliste.", prerequisites: ["sixth-instruction-verbs"], nextSkills: ["sixth-school-autonomy"] },
  { id: "sixth-school-autonomy", child: "leony", label: "Autonomie scolaire", subject: "Méthode & organisation", domain: "Organisation", level: "6e", description: "Préparer son matériel et anticiper les besoins de la journée.", prerequisites: ["sixth-task-planning"], nextSkills: [] },
  { id: "sixth-fraction-meaning", child: "leony", label: "Sens des fractions", subject: "Mathématiques", domain: "Nombres", level: "6e", description: "Interpréter et comparer des fractions simples.", prerequisites: [], nextSkills: ["sixth-proportional-reasoning"] },
  { id: "sixth-proportional-reasoning", child: "leony", label: "Proportionnalité", subject: "Mathématiques", domain: "Calcul", level: "6e", description: "Reconnaître et compléter une situation proportionnelle simple.", prerequisites: ["sixth-fraction-meaning"], nextSkills: [] },
  { id: "sixth-english-personal-info", child: "leony", label: "Informations personnelles en anglais", subject: "Anglais", domain: "Compréhension", level: "6e", description: "Comprendre une présentation personnelle simple.", prerequisites: [], nextSkills: ["sixth-english-present-simple"] },
  { id: "sixth-english-present-simple", child: "leony", label: "Présent simple", subject: "Anglais", domain: "Grammaire", level: "6e", description: "Comprendre et employer le présent simple à la troisième personne.", prerequisites: ["sixth-english-personal-info"], nextSkills: [] },
  { id: "sixth-text-main-idea", child: "leony", label: "Idée essentielle d’un texte", subject: "Français", domain: "Lecture & synthèse", level: "6e", description: "Identifier le thème et reformuler l’idée principale.", prerequisites: [], nextSkills: [] },
  { id: "sixth-word-classes", child: "leony", label: "Classes grammaticales", subject: "Français", domain: "Grammaire", level: "6e", description: "Identifier plusieurs classes grammaticales et justifier un accord.", prerequisites: [], nextSkills: [] },
];

const nodesById = new Map(knowledgeNodes.map((node) => [node.id, node]));
const nodesByLegacyLabel = new Map(knowledgeNodes.map((node) => [node.label.toLocaleLowerCase("fr"), node]));

export function getKnowledgeNode(skillId: string) {
  return nodesById.get(skillId);
}

export function getKnowledgeNodesForChild(child: ChildKey) {
  return knowledgeNodes.filter((node) => node.child === child);
}

export function getKnowledgePath(skillId: string) {
  const node = getKnowledgeNode(skillId);
  return node ? [node.subject, node.domain, node.label] : [];
}

export function resolveAttemptSkillId(attempt: AttemptRecord) {
  const mission = learningMissions.find((item) => item.id === attempt.missionId);
  if (mission?.skillId) return mission.skillId;
  return nodesByLegacyLabel.get(attempt.skill.toLocaleLowerCase("fr"))?.id;
}

export function buildKnowledgeGraphMastery(attempts: AttemptRecord[]): KnowledgeSkillMastery[] {
  const resolved = attempts.flatMap((attempt) => {
    const skillId = resolveAttemptSkillId(attempt);
    return skillId ? [{ ...attempt, skill: skillId }] : [];
  });
  const masteryById = new Map(buildSkillMastery(resolved).map((profile) => [profile.label, profile]));

  return [...masteryById.entries()].flatMap(([skillId, profile]) => {
    const node = getKnowledgeNode(skillId);
    if (!node) return [];
    return [{
      ...profile,
      label: node.label,
      skillId,
      subject: node.subject,
      domain: node.domain,
      level: node.level,
      description: node.description,
      prerequisites: node.prerequisites.map((id) => ({
        id,
        label: getKnowledgeNode(id)?.label ?? id,
        mastered: masteryById.get(id)?.status === "mastered",
      })),
      nextSkills: node.nextSkills.map((id) => ({ id, label: getKnowledgeNode(id)?.label ?? id })),
      path: getKnowledgePath(skillId),
    }];
  }).sort((a, b) => {
    const priority = { fragile: 0, discovery: 1, progressing: 2, mastered: 3 } as const;
    return priority[a.status] - priority[b.status] || a.value - b.value;
  });
}

export function getPrerequisiteReadiness(skillId: string, profiles: KnowledgeSkillMastery[]) {
  const node = getKnowledgeNode(skillId);
  if (!node || !node.prerequisites.length) return { ready: true, ratio: 1, missing: [] as KnowledgeNode[] };
  const profilesById = new Map(profiles.map((profile) => [profile.skillId, profile]));
  const missing = node.prerequisites
    .filter((id) => {
      const profile = profilesById.get(id);
      return Boolean(profile && profile.status !== "mastered" && profile.value < 65);
    })
    .flatMap((id) => {
      const prerequisite = getKnowledgeNode(id);
      return prerequisite ? [prerequisite] : [];
    });
  return { ready: missing.length === 0, ratio: (node.prerequisites.length - missing.length) / node.prerequisites.length, missing };
}
