import { notFound } from "next/navigation";
import { InteractiveMission } from "@/components/exercises/InteractiveMission";
import { BossInteractiveMission } from "@/components/exercises/BossInteractiveMission";
import { getMission } from "@/lib/content/missions";
import type { AttemptRecord, ChildKey, LearningTrack } from "@/lib/progress/types";
import { buildAdaptiveLearningProfile, getAdaptiveSettingsForSkill } from "@/lib/pedagogy/adaptive-learning";
import { getAdventureWorld } from "@/lib/content/adventure-worlds";
import type { BossBattleConfig } from "@/lib/game/boss-battles";

export function MissionFromLibrary({ child, track = child === "leony" ? "leony" : "alyssio", firstName, slug, backHref, attempts = [], totalXp = 0, bossBattle }: { child: ChildKey; track?: LearningTrack; firstName?: string; slug: string; backHref: string; attempts?: AttemptRecord[]; totalXp?: number; bossBattle?: BossBattleConfig & { phase:number; totalPhases:number; isFinalPhase:boolean } }) {
  const baseMission = getMission(track, slug);
  const mission = baseMission ? { ...baseMission, child, firstName: firstName ?? baseMission.firstName } : null;
  if (!mission) notFound();
  const world = getAdventureWorld(track, firstName);
  const stage = world.stages.find((item) => item.id === mission.adventureStageId);
  const adaptiveProfile = buildAdaptiveLearningProfile(track, attempts);
  const adaptiveSettings = getAdaptiveSettingsForSkill(adaptiveProfile, mission.skillId);

  if (bossBattle) {
    return <BossInteractiveMission {...mission} missionId={mission.id} backHref={backHref} totalXpBefore={totalXp} bossBattle={bossBattle} />;
  }

  return (
    <InteractiveMission
      {...mission}
      missionId={mission.id}
      backHref={backHref}
      adventureWorld={world.name}
      adventureStage={stage?.name}
      adventureReward={stage?.reward}
      adventureSceneId={world.sceneId}
      adventureStageScene={stage?.scene}
      adventureStageObjective={stage?.objective}
      companionCharacterId={stage?.characterId ?? world.guideCharacterId}
      companionExpression={stage?.expression ?? "happy"}
      novaHelpEnabled
      adaptiveSettings={adaptiveSettings}
      totalXpBefore={totalXp}
    />
  );
}
