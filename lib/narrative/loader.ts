import { season01 } from "@/content/seasons/season-01/season";
import { season02 } from "@/content/seasons/season-02/season";
import type { NarrativeChapter, NarrativeSeason } from "./types";

const seasons: NarrativeSeason[] = [season01, season02];

export function getSeasons() {
  return seasons;
}

export function getSeason(slug = "la-porte-des-mondes") {
  return seasons.find((season) => season.slug === slug);
}

export function getChapter(chapterSlug: string): { season: NarrativeSeason; chapter: NarrativeChapter } | undefined {
  for (const season of seasons) {
    const chapter = season.chapters.find((item) => item.slug === chapterSlug);
    if (chapter) return { season, chapter };
  }
  return undefined;
}
