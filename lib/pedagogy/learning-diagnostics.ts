import {
  buildKnowledgeGraphMastery,
  getKnowledgeNode,
  getKnowledgeNodesForChild,
  type KnowledgeSkillMastery,
} from "@/lib/pedagogy/knowledge-graph";
import type { AttemptRecord, ChildKey } from "@/lib/progress/types";

export type DiagnosticSeverity = "attention" | "priority" | "watch";

export type LearningBlockage = {
  id: string;
  skillId: string;
  targetSkillId?: string;
  title: string;
  detail: string;
  severity: DiagnosticSeverity;
  evidence: string;
  confidence: number;
};

export type LearningStrength = {
  skillId: string;
  label: string;
  detail: string;
};

export type LearningDiagnostic = {
  blockages: LearningBlockage[];
  strengths: LearningStrength[];
  nextStep: {
    skillId: string;
    label: string;
    reason: string;
  } | null;
  recommendation: string;
  confidence: number;
  observedSkills: number;
  totalSkills: number;
};

function profileConfidence(profile: KnowledgeSkillMastery) {
  return Math.min(100, Math.max(profile.confidence, profile.attempts >= 4 ? 80 : 0));
}

function severityWeight(severity: DiagnosticSeverity) {
  return severity === "priority" ? 3 : severity === "attention" ? 2 : 1;
}

export function analyzeLearningDiagnostics(child: ChildKey, attempts: AttemptRecord[]): LearningDiagnostic {
  const childAttempts = attempts.filter((attempt) => attempt.child === child);
  const profiles = buildKnowledgeGraphMastery(childAttempts);
  const profilesById = new Map(profiles.map((profile) => [profile.skillId, profile]));
  const nodes = getKnowledgeNodesForChild(child);
  const blockagesBySkill = new Map<string, LearningBlockage>();

  profiles.forEach((profile) => {
    const node = getKnowledgeNode(profile.skillId);
    if (!node) return;

    const weakPrerequisite = node.prerequisites
      .map((id) => ({ node: getKnowledgeNode(id), profile: profilesById.get(id) }))
      .find(({ profile: prerequisiteProfile }) => prerequisiteProfile && prerequisiteProfile.status !== "mastered" && prerequisiteProfile.value < 65);

    if (weakPrerequisite?.node && weakPrerequisite.profile) {
      const prerequisite = weakPrerequisite.profile;
      blockagesBySkill.set(weakPrerequisite.node.id, {
        id: `prerequisite-${weakPrerequisite.node.id}-${node.id}`,
        skillId: weakPrerequisite.node.id,
        targetSkillId: node.id,
        title: `${weakPrerequisite.node.label} bloque probablement la suite`,
        detail: `La notion « ${node.label} » dépend de ce prérequis. Le consolider avant d’avancer évitera d’empiler les difficultés.`,
        severity: prerequisite.status === "fragile" ? "priority" : "attention",
        evidence: `${prerequisite.attempts} mission${prerequisite.attempts > 1 ? "s" : ""} · ${prerequisite.value}% de maîtrise`,
        confidence: profileConfidence(prerequisite),
      });
      return;
    }

    if (profile.status === "fragile" && profile.attempts >= 2) {
      blockagesBySkill.set(node.id, {
        id: `fragile-${node.id}`,
        skillId: node.id,
        title: `${node.label} reste fragile`,
        detail: profile.trend === "down"
          ? "Les derniers résultats baissent. Une mission plus simple et guidée est préférable avant de reprendre la progression."
          : "Les résultats sont encore irréguliers. Une courte série de consolidation permettra de stabiliser la compétence.",
        severity: profile.value < 45 || profile.trend === "down" ? "priority" : "attention",
        evidence: `${profile.attempts} missions · ${profile.value}% de maîtrise`,
        confidence: profileConfidence(profile),
      });
      return;
    }

    if (profile.trend === "down" && profile.attempts >= 3) {
      blockagesBySkill.set(node.id, {
        id: `trend-${node.id}`,
        skillId: node.id,
        title: `${node.label} est à surveiller`,
        detail: "La compétence était mieux réussie auparavant. Une révision espacée peut suffire à la stabiliser.",
        severity: "watch",
        evidence: `${profile.attempts} missions observées · tendance récente en baisse`,
        confidence: profileConfidence(profile),
      });
    }
  });

  const blockages = [...blockagesBySkill.values()]
    .sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity) || b.confidence - a.confidence)
    .slice(0, 3);

  const strengths = profiles
    .filter((profile) => profile.status === "mastered" || (profile.status === "progressing" && profile.trend === "up" && profile.value >= 70))
    .sort((a, b) => b.value - a.value || b.confidence - a.confidence)
    .slice(0, 3)
    .map((profile) => ({
      skillId: profile.skillId,
      label: profile.label,
      detail: profile.status === "mastered" ? `${profile.value}% · compétence maîtrisée` : `${profile.value}% · progression régulière`,
    }));

  const primaryBlockage = blockages[0];
  const readyUnseen = nodes.find((node) => {
    if (profilesById.has(node.id)) return false;
    return node.prerequisites.every((id) => profilesById.get(id)?.status === "mastered");
  });
  const nextNode = primaryBlockage ? getKnowledgeNode(primaryBlockage.skillId) : readyUnseen;
  const nextStep = nextNode ? {
    skillId: nextNode.id,
    label: nextNode.label,
    reason: primaryBlockage
      ? `Consolider ce point avant de poursuivre vers « ${primaryBlockage.targetSkillId ? getKnowledgeNode(primaryBlockage.targetSkillId)?.label ?? "la notion suivante" : "la suite du parcours"} ».`
      : "Les prérequis sont acquis : cette notion constitue la prochaine étape logique du parcours.",
  } : null;

  const confidence = profiles.length
    ? Math.round(profiles.reduce((sum, profile) => sum + profileConfidence(profile), 0) / profiles.length)
    : 0;

  let recommendation = "Les premières missions permettront au moteur d’identifier les points forts et les notions à consolider.";
  if (primaryBlockage && nextNode) {
    recommendation = `Priorité : retravailler « ${nextNode.label} » avec une mission courte et guidée. ${primaryBlockage.detail}`;
  } else if (readyUnseen) {
    recommendation = `Les notions observées sont suffisamment stables pour introduire « ${readyUnseen.label} » progressivement.`;
  } else if (strengths.length) {
    recommendation = `Les compétences observées sont bien installées. Continuez avec des défis légèrement plus difficiles, sans allonger les séances.`;
  }

  return {
    blockages,
    strengths,
    nextStep,
    recommendation,
    confidence,
    observedSkills: profiles.length,
    totalSkills: nodes.length,
  };
}

export function getDiagnosticPrioritySkillIds(child: ChildKey, attempts: AttemptRecord[]) {
  const diagnostic = analyzeLearningDiagnostics(child, attempts);
  return new Set(diagnostic.blockages.map((blockage) => blockage.skillId));
}
