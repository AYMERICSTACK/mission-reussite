import { notFound } from "next/navigation";
import { requireAccount } from "@/lib/auth/session";
import { getChildProfile } from "@/lib/family/profiles";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { buildAchievementCollection } from "@/lib/achievements/achievements";
import { getAchievementGameStats } from "@/lib/achievements/server";
import { CollectionPage } from "@/components/achievements/CollectionPage";

export const dynamic = "force-dynamic";

export default async function ChildCollectionPage({ params }: { params: Promise<{ childSlug: string }> }) {
  const account = await requireAccount();
  const { childSlug } = await params;
  const profile = await getChildProfile(childSlug, account.family!.id);
  if (!profile) notFound();
  const [{ attempts }, gameStats] = await Promise.all([
    getDashboardData(profile.slug, profile.track, account.family!.id),
    getAchievementGameStats(profile.id),
  ]);
  return <CollectionPage firstName={profile.firstName} backHref={`/mission/${profile.slug}`} childSlug={profile.slug} collection={buildAchievementCollection(attempts, profile.track, gameStats)} />;
}
