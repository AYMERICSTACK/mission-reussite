import type { LearningMission, MissionStep } from "@/lib/content/missions";
import type { LearningTrack } from "@/lib/progress/types";
import { getAdventureWorld } from "@/lib/content/adventure-worlds";
import { getKnowledgeNode, getKnowledgePath } from "@/lib/pedagogy/knowledge-graph";

export type NovaMission = Pick<LearningMission, "title" | "story" | "steps"> & {
  introduction: string;
  closing: string;
};

export type NovaHelp = {
  message: string;
  questionToThink: string;
};

const missionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "introduction", "story", "closing", "steps"],
  properties: {
    title: { type: "string" },
    introduction: { type: "string" },
    story: { type: "string" },
    closing: { type: "string" },
    steps: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["eyebrow", "title", "instruction", "choices", "answer", "success", "hint"],
        properties: {
          eyebrow: { type: "string" },
          title: { type: "string" },
          instruction: { type: "string" },
          choices: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["label", "value"],
              properties: { label: { type: "string" }, value: { type: "string" } },
            },
          },
          answer: { type: "string" },
          success: { type: "string" },
          hint: { type: "string" },
        },
      },
    },
  },
} as const;

const helpSchema = {
  type: "object",
  additionalProperties: false,
  required: ["message", "questionToThink"],
  properties: {
    message: { type: "string" },
    questionToThink: { type: "string" },
  },
} as const;

function isValidStep(step: MissionStep) {
  return step.choices.length === 3 && step.choices.some((choice) => choice.value === step.answer);
}

export function validateNovaMission(value: unknown): value is NovaMission {
  if (!value || typeof value !== "object") return false;
  const mission = value as NovaMission;
  return typeof mission.title === "string" && typeof mission.introduction === "string" && typeof mission.story === "string" && typeof mission.closing === "string" && Array.isArray(mission.steps) && mission.steps.length === 3 && mission.steps.every(isValidStep);
}

function validateNovaHelp(value: unknown): value is NovaHelp {
  if (!value || typeof value !== "object") return false;
  const help = value as NovaHelp;
  return typeof help.message === "string" && help.message.length > 0 && typeof help.questionToThink === "string" && help.questionToThink.length > 0;
}

async function requestStructuredOutput<T>(prompt: string, name: string, schema: object, maxOutputTokens: number): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY_MISSING");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: prompt,
      max_output_tokens: maxOutputTokens,
      text: { format: { type: "json_schema", name, strict: true, schema } },
    }),
  });

  if (!response.ok) throw new Error(`OPENAI_${response.status}`);
  const data = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  const raw = data.output_text ?? data.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("");
  if (!raw) throw new Error("OPENAI_EMPTY_RESPONSE");
  return JSON.parse(raw) as T;
}

export async function generateNovaMission(target: LearningMission, profile?: { track: LearningTrack; interests?: string[] }): Promise<NovaMission> {
  const node = getKnowledgeNode(target.skillId);
  const world = getAdventureWorld(profile?.track ?? (target.child === "leony" ? "leony" : "alyssio"), target.firstName);
  const stage = world.stages.find((item) => item.id === target.adventureStageId) ?? world.stages[0];
  const prompt = [
    `Tu incarnes Nova, guide bienveillante de ${target.firstName}, niveau ${target.grade}.`,
    `L'aventure se déroule dans « ${world.name} », chapitre « ${world.chapter} », au lieu « ${stage.name} ».`,
    `${stage.character} accompagne l'enfant. Décor : ${stage.scene}`,
    `Le trésor du lieu est « ${stage.reward} ». Fais avancer légèrement cette intrigue sans conclure tout le chapitre.`,
    "Le parcours pédagogique a déjà choisi la notion, la difficulté et l'objectif. Respecte-les exactement.",
    `Matière et chemin : ${getKnowledgePath(target.skillId).join(" > ")}.`,
    `Notion exacte : ${node?.label ?? target.skill}.`,
    `Objectif : ${target.objective}. Difficulté : ${target.difficulty}/5. Durée : ${target.duration}.`,
    profile?.interests?.length ? `Centres d’intérêt de l’enfant, à utiliser avec discrétion si cela sert l’histoire : ${profile.interests.join(", ")}.` : "",
    `Ton : ${target.tone === "ce2" ? "très accessible, chaleureux, phrases courtes, imaginaire vivant" : "immersif, stimulant, clair, adapté à une élève de 6e"}.`,
    "L'introduction doit être une courte parole directe de Nova. Le closing doit féliciter l'enfant et annoncer une petite conséquence narrative dans le lieu.",
    "Crée exactement 3 questions à choix unique. Chaque question doit avoir 3 choix aux valeurs courtes et uniques, une seule bonne réponse, un indice utile sans révéler directement la réponse et un encouragement précis.",
    "Ne cite jamais OpenAI, l'intelligence artificielle, un moteur, une API ou une technologie. Ne demande aucune donnée personnelle.",
  ].join("\n");

  const parsed = await requestStructuredOutput<unknown>(prompt, "nova_mission", missionSchema, 1500);
  if (!validateNovaMission(parsed)) throw new Error("OPENAI_INVALID_MISSION");
  return parsed;
}

export async function generateNovaHelp(input: {
  mission: LearningMission;
  track?: LearningTrack;
  stepIndex: number;
  selectedValue: string;
}): Promise<NovaHelp> {
  const { mission, track, stepIndex, selectedValue } = input;
  const step = mission.steps[stepIndex];
  if (!step) throw new Error("NOVA_STEP_NOT_FOUND");
  const selectedChoice = step.choices.find((choice) => choice.value === selectedValue);
  if (!selectedChoice) throw new Error("NOVA_CHOICE_NOT_FOUND");

  const world = getAdventureWorld(track ?? (mission.child === "leony" ? "leony" : "alyssio"), mission.firstName);
  const stage = world.stages.find((item) => item.id === mission.adventureStageId) ?? world.stages[0];
  const prompt = [
    `Tu es Nova, guide de ${mission.firstName}, niveau ${mission.grade}, dans ${world.name}.`,
    `La quête se déroule à ${stage.name}, avec ${stage.character}.`,
    `Compétence travaillée : ${getKnowledgePath(mission.skillId).join(" > ")}.`,
    `Histoire : ${mission.story}`,
    `Question : ${step.title}. Consigne : ${step.instruction}`,
    `Réponse choisie par l'enfant : ${selectedChoice.label}. Cette réponse est incorrecte.`,
    `Indice déjà disponible : ${step.hint}`,
    "Explique autrement en 2 ou 3 phrases courtes, sans donner directement la bonne réponse ni citer sa lettre. Utilise une image mentale ou une petite méthode adaptée à l'âge.",
    "Puis pose une seule question-guidage très courte qui aide l'enfant à raisonner par lui-même.",
    "Reste encourageante. Ne parle jamais de technologie, d'IA ou de moteur.",
  ].join("\n");

  const parsed = await requestStructuredOutput<unknown>(prompt, "nova_help", helpSchema, 260);
  if (!validateNovaHelp(parsed)) throw new Error("OPENAI_INVALID_HELP");
  return parsed;
}
