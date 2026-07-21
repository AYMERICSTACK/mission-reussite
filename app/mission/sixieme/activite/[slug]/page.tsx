import { redirectToTrack } from "@/lib/auth/legacy-route";
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return redirectToTrack("leony",`/activite/${slug}`)}
