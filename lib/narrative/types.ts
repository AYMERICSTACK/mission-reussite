import type { LearningTrack } from "@/lib/progress/types";

export type NarrativeReward = {
  id: string;
  label: string;
  description: string;
  symbol: string;
  xpBonus?: number;
};

export type NarrativeDialogue = {
  speaker: "Oscar" | "Nova" | "Orion" | "Lyra" | "Kael" | "Narrateur";
  text: string;
  mood?: "calm" | "happy" | "worried" | "determined";
};

export type NarrativeMission = {
  id: string;
  title: string;
  activitySlug: string;
  objective: string;
  intro: NarrativeDialogue[];
  outro: NarrativeDialogue[];
  reward?: NarrativeReward;
};

export type NarrativeChapter = {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  location: string;
  symbol: string;
  isBoss?: boolean;
  tracks: LearningTrack[];
  opening: NarrativeDialogue[];
  missions: NarrativeMission[];
  completionDialogue: NarrativeDialogue[];
  reward: NarrativeReward;
  finale?: {
    title: string;
    message: string;
    seasonTwoTitle: string;
    seasonTwoMessage: string;
  };
};

export type NarrativeSeason = {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  synopsis: string;
  chapters: NarrativeChapter[];
};

export type NarrativeMissionState = NarrativeMission & {
  status: "done" | "ready" | "locked";
};

export type NarrativeChapterProgress = {
  chapter: NarrativeChapter;
  missions: NarrativeMissionState[];
  completedMissionCount: number;
  totalMissionCount: number;
  percent: number;
  completed: boolean;
  locked: boolean;
};
