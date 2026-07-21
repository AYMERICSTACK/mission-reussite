import { notFound } from "next/navigation";
import { CampaignMap } from "@/components/map/CampaignMap";
import { requireAccount } from "@/lib/auth/session";
import { getChildProfile } from "@/lib/family/profiles";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getSeason } from "@/lib/narrative/loader";
import { buildSeasonProgress } from "@/lib/narrative/progress";

export const dynamic = "force-dynamic";

export default async function CampaignMapPage({ params }: { params: Promise<{ childSlug: string }> }) {
  const account = await requireAccount();
  const { childSlug } = await params;
  const child = await getChildProfile(childSlug, account.family!.id);
  if (!child) notFound();
  const season = getSeason("la-porte-des-mondes");
  const seasonTwo = getSeason("les-iles-du-temps");
  if (!season || !seasonTwo) notFound();
  const { attempts } = await getDashboardData(child.slug, child.track, account.family!.id);
  const chapters = buildSeasonProgress(season, child.track, attempts);
  return <CampaignMap childSlug={child.slug} firstName={child.firstName} seasonTitle={season.title} seasonTwoTitle={seasonTwo.title} chapters={chapters} />;
}
