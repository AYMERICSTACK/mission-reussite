import { notFound } from "next/navigation";
import { AvatarStudio } from "@/components/avatar/AvatarStudio";
import { requireAccount } from "@/lib/auth/session";
import { getChildProfile } from "@/lib/family/profiles";

export const dynamic = "force-dynamic";

export default async function AvatarPage({ params }: { params: Promise<{ childSlug: string }> }) {
  const account = await requireAccount();
  const { childSlug } = await params;
  const child = await getChildProfile(childSlug, account.family!.id);
  if (!child) notFound();
  return <AvatarStudio childSlug={child.slug} />;
}
