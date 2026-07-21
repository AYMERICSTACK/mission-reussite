import { notFound } from "next/navigation";
import { NarrativeChapter } from "@/components/narrative/NarrativeChapter";
import { requireAccount } from "@/lib/auth/session";
import { getChildProfile } from "@/lib/family/profiles";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getChapter } from "@/lib/narrative/loader";
import { buildSeasonProgress } from "@/lib/narrative/progress";
import { getChapterCinematic } from "@/lib/cinematics/cinematics";

export const dynamic = "force-dynamic";
export default async function ChapterPage({params}:{params:Promise<{childSlug:string;chapterSlug:string}>}){
  const account=await requireAccount();
  const {childSlug,chapterSlug}=await params;
  const profile=await getChildProfile(childSlug,account.family!.id);
  const narrative=getChapter(chapterSlug);
  if(!profile||!narrative)return notFound();
  const {attempts}=await getDashboardData(profile.slug,profile.track,account.family!.id);
  const chapters=buildSeasonProgress(narrative.season,profile.track,attempts);
  const progress=chapters.find((item)=>item.chapter.slug===chapterSlug);
  if(!progress||progress.locked)return notFound();
  const nextChapter=chapters.find((item)=>item.chapter.number===progress.chapter.number+1);
  const cinematic=getChapterCinematic(progress.chapter);
  return <NarrativeChapter cinematic={cinematic} season={narrative.season} progress={progress} childSlug={profile.slug} firstName={profile.firstName} nextChapterSlug={progress.completed&&!nextChapter?.locked?nextChapter?.chapter.slug:undefined}/>;
}
