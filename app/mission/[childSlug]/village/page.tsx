import { notFound } from "next/navigation";
import { VillageHub } from "@/components/village/VillageHub";
import { requireAccount } from "@/lib/auth/session";
import { getChildProfile } from "@/lib/family/profiles";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getSeason } from "@/lib/narrative/loader";
import { buildSeasonProgress } from "@/lib/narrative/progress";
import { getSideQuestSnapshot } from "@/lib/game/side-quest-service";

export const dynamic = "force-dynamic";

export default async function VillagePage({ params }: { params: Promise<{ childSlug: string }> }) {
  const account = await requireAccount();
  const { childSlug } = await params;
  const child = await getChildProfile(childSlug, account.family!.id);
  if (!child) notFound();
  const { attempts, summary } = await getDashboardData(child.slug, child.track, account.family!.id);
  const initialQuests = await getSideQuestSnapshot(child.id);
  const season = getSeason("la-porte-des-mondes");
  const completedChapters = season ? buildSeasonProgress(season, child.track, attempts).filter((chapter) => chapter.completed).length : 0;
  return <VillageHub childSlug={child.slug} firstName={child.firstName} completedChapters={completedChapters} totalXp={summary.totalXp} initialQuests={initialQuests} />;
}
