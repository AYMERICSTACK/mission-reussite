import type { ChildKey } from "@/lib/progress/types";

export type LibraryContentType = "story" | "problem" | "exercise" | "challenge" | "game";
export type LibrarySource = "editorial" | "generated-template" | "nova-special";

export type LibraryMetadata = {
  contentType: LibraryContentType;
  worldId: string;
  chapterId: string;
  source: LibrarySource;
  curriculum: string[];
  interests: string[];
  estimatedMinutes: number;
  version: number;
};

export type LibraryCoverage = {
  total: number;
  byChild: Record<ChildKey, number>;
  byType: Record<LibraryContentType, number>;
  bySkill: Record<string, number>;
  byDifficulty: Record<number, number>;
};
