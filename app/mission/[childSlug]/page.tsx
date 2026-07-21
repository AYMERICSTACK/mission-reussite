import { notFound } from "next/navigation";
import { MissionDashboard } from "@/components/dashboard/MissionDashboard";
import { getMissionCatalogStats } from "@/lib/content/missions";
import { getAdventureWorld, getWorldAtlas } from "@/lib/content/adventure-worlds";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getKnowledgePath } from "@/lib/pedagogy/knowledge-graph";
import { buildAdventureInventory } from "@/lib/game/adventure-inventory";
import { getChildProfile } from "@/lib/family/profiles";
import { requireAccount } from "@/lib/auth/session";
import { buildAchievementCollection } from "@/lib/achievements/achievements";
import { getSeason } from "@/lib/narrative/loader";
import { getCurrentChapterProgress } from "@/lib/narrative/progress";
import { getHeroRank } from "@/lib/game/levels";
import { getAchievementGameStats } from "@/lib/achievements/server";

export const dynamic = "force-dynamic";
const colors=["purple","orange","teal","blue"] as const;
const iconByCategory=(category:string)=>{const v=category.toLowerCase();if(v.includes('lecture'))return 'book' as const;if(v.includes('calcul'))return 'bolt' as const;if(v.includes('problème')||v.includes('math'))return 'math' as const;return 'pen' as const};

export default async function ChildMissionPage({params}:{params:Promise<{childSlug:string}>}){
 const account=await requireAccount(); const {childSlug}=await params; const profile=await getChildProfile(childSlug,account.family!.id); if(!profile) notFound();
 const [{recommendations,summary,streak,weeklyProgress,attempts,adaptiveProfile},achievementGameStats]=await Promise.all([getDashboardData(profile.slug,profile.track,account.family!.id),getAchievementGameStats(profile.id)]);
 const catalog=getMissionCatalogStats(profile.track); const world=getAdventureWorld(profile.track,profile.firstName); const worldAtlas=getWorldAtlas(profile.track,summary.totalXp); const inventory=buildAdventureInventory(profile.track,attempts);
 const achievementCollection=buildAchievementCollection(attempts,profile.track,achievementGameStats); const season=getSeason(); const narrativeProgress=season?getCurrentChapterProgress(season,profile.track,attempts):undefined;
 const missions=recommendations.map(({mission,reason,status},index)=>({title:mission.title,category:mission.category,duration:mission.durationLabel,xp:mission.xp,difficulty:mission.difficulty,objective:mission.objective,skillPath:getKnowledgePath(mission.skillId),recommendation:reason,location:world.stages.find(s=>s.id===mission.adventureStageId)?.name??world.name,icon:iconByCategory(mission.category),status,color:colors[index%colors.length],href:`/mission/${profile.slug}/activite/${mission.slug}`}));
 const weakest=summary.skills[0]; const heroRank=getHeroRank(summary.totalXp); const interest=profile.interests[0];
 return <MissionDashboard firstName={profile.firstName} grade={profile.grade} tone={profile.track==='alyssio'?'ce2':'sixth'} level={heroRank.level} levelTitle={heroRank.title} levelSymbol={heroRank.symbol} levelReward={heroRank.reward} xp={heroRank.xpInLevel} totalXp={summary.totalXp} nextLevelXp={heroRank.xpNeeded} streak={streak} weeklyProgress={weeklyProgress} headline={profile.track==='alyssio'?`Oscar t’attend, ${profile.firstName}`:`La Cité compte sur toi, ${profile.firstName}`} message={interest?`Ton aventure avance à ton rythme. Nova sait que tu aimes ${interest.toLowerCase()} et pourra s’en inspirer pour tes aventures spéciales.`:'Ton aventure avance à ton rythme. Chaque quête est choisie pour t’aider à progresser.'} focusLabel="Objectif prioritaire" focusValue={weakest?.label??profile.objective??'Découvrir les missions'} missions={missions} programLabel={`${catalog.total} aventures disponibles · parcours personnalisé`} novaHref={`/mission/nova?child=${profile.slug}`} world={world} worldAtlas={worldAtlas} inventory={inventory} adaptiveProfile={adaptiveProfile} achievementCollection={achievementCollection} collectionHref={`/mission/${profile.slug}/collection`} childSlug={profile.slug} narrative={narrativeProgress&&season?{seasonTitle:season.title,chapterNumber:narrativeProgress.chapter.number,chapterTitle:narrativeProgress.chapter.title,summary:narrativeProgress.chapter.summary,symbol:narrativeProgress.chapter.symbol,percent:narrativeProgress.percent,completed:narrativeProgress.completed,href:`/mission/${profile.slug}/chapitres/${narrativeProgress.chapter.slug}`}:undefined} skills={(summary.skills.length?summary.skills:[{label:'Découverte',value:0},{label:'Confiance',value:0},{label:'Régularité',value:0},{label:'Autonomie',value:0}]).slice(0,4)}/>
}
