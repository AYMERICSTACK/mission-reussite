import { notFound } from "next/navigation";
import { NovaMission } from "@/components/exercises/NovaMission";
import { getDashboardData } from "@/lib/pedagogy/dashboard-data";
import { getChildProfile } from "@/lib/family/profiles";
import { requireAccount } from "@/lib/auth/session";
export const dynamic="force-dynamic";
export default async function Page({searchParams}:{searchParams:Promise<{child?:string}>}){const account=await requireAccount();const {child}=await searchParams;if(!child)notFound();const profile=await getChildProfile(child,account.family!.id);if(!profile)notFound();const {recommendations}=await getDashboardData(profile.slug,profile.track,account.family!.id);const base=recommendations[0]?.mission;if(!base)notFound();const target={...base,child:profile.slug,firstName:profile.firstName};return <NovaMission target={target} backHref={`/mission/${profile.slug}`}/>}
