import { NextResponse } from "next/server";
import { ensureInitialData } from "@/lib/db/bootstrap";
import { getCurrentAccount } from "@/lib/auth/session";
export const runtime="nodejs";
export async function POST(){const account=await getCurrentAccount();if(!account)return NextResponse.json({ok:false,error:"Non authentifié."},{status:401});try{await ensureInitialData();return NextResponse.json({ok:true})}catch(error){console.error("Bootstrap Mission Réussite:",error);return NextResponse.json({ok:false,error:"Impossible d’initialiser les missions."},{status:500})}}
