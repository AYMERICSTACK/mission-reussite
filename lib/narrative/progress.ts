import { getMission } from "@/lib/content/missions";
import type { AttemptRecord, LearningTrack } from "@/lib/progress/types";
import type { NarrativeChapter, NarrativeChapterProgress, NarrativeSeason } from "./types";

const legacyMissionIds: Record<string, string> = {
  "mystere-tresor": "ce2-reading-treasure",
  "marche-explorateurs": "ce2-guided-problem-market",
  "pont-soustractions": "ce2-subtraction-bridge",
  "calcul-eclair": "ce2-mental-additions",
};

function completedMissionIds(attempts: AttemptRecord[]) {
  return new Set(attempts.filter((attempt) => attempt.child && attempt.missionId).map((attempt) => attempt.missionId));
}

export function buildChapterProgress(chapter: NarrativeChapter, track: LearningTrack, attempts: AttemptRecord[]): NarrativeChapterProgress {
  const completedIds = completedMissionIds(attempts);
  let previousDone = true;

  const missions = chapter.missions.map((mission) => {
    const catalogMission = getMission(track, mission.activitySlug);
    const expectedId = catalogMission?.id ?? legacyMissionIds[mission.activitySlug] ?? mission.activitySlug;
    const done = completedIds.has(expectedId) || completedIds.has(mission.activitySlug);
    const status = done ? "done" : previousDone ? "ready" : "locked";
    previousDone = done;
    return { ...mission, status } as const;
  });

  const completedMissionCount = missions.filter((mission) => mission.status === "done").length;
  return {
    chapter,
    missions,
    completedMissionCount,
    totalMissionCount: missions.length,
    percent: Math.round((completedMissionCount / Math.max(1, missions.length)) * 100),
    completed: completedMissionCount === missions.length,
    locked: !chapter.tracks.includes(track),
  };
}

export function buildSeasonProgress(season: NarrativeSeason, track: LearningTrack, attempts: AttemptRecord[]) {
  let previousChapterCompleted = true;
  return season.chapters.map((chapter) => {
    const progress = buildChapterProgress(chapter, track, attempts);
    const locked = progress.locked || !previousChapterCompleted;
    const result = { ...progress, locked };
    previousChapterCompleted = progress.completed;
    return result;
  });
}

export function getCurrentChapterProgress(season: NarrativeSeason, track: LearningTrack, attempts: AttemptRecord[]) {
  const chapters = buildSeasonProgress(season, track, attempts);
  return chapters.find((chapter) => !chapter.locked && !chapter.completed) ?? chapters.findLast((chapter) => !chapter.locked);
}
