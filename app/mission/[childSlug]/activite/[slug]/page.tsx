import { notFound } from "next/navigation";
import { MissionFromLibrary } from "@/components/exercises/MissionFromLibrary";
import { getChildProfile } from "@/lib/family/profiles";
import { requireAccount } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getChapter } from "@/lib/narrative/loader";
import { getBossBattle } from "@/lib/game/boss-battles";
export default async function Page({params,searchParams}:{params:Promise<{childSlug:string;slug:string}>;searchParams:Promise<{chapter?:string}>}){
 const account=await requireAccount(); const {childSlug,slug}=await params; const {chapter:chapterSlug}=await searchParams;
 const profile=await getChildProfile(childSlug,account.family!.id); if(!profile)return notFound();
 const {attempts,summary}=await getDashboardData(profile.slug,profile.track,account.family!.id);
 const narrative=chapterSlug?getChapter(chapterSlug):undefined;
 const missionIndex=narrative?.chapter.missions.findIndex((mission)=>mission.activitySlug===slug)??-1;
 const config=narrative?.chapter.isBoss?getBossBattle(narrative.chapter.slug):undefined;
 const bossBattle=config&&narrative?{...config,phase:missionIndex>=0?missionIndex+1:1,totalPhases:narrative.chapter.missions.length,isFinalPhase:missionIndex===narrative.chapter.missions.length-1}:undefined;
 return <MissionFromLibrary child={profile.slug} track={profile.track} firstName={profile.firstName} slug={slug} backHref={chapterSlug?`/mission/${profile.slug}/chapitres/${chapterSlug}`:`/mission/${profile.slug}`} attempts={attempts} totalXp={summary.totalXp} bossBattle={bossBattle}/>;
}
