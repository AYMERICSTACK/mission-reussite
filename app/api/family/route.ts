import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { trackFromGrade } from "@/lib/family/profiles";
import { getCurrentAccount } from "@/lib/auth/session";

function slugify(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
async function authFamily(){const account=await getCurrentAccount();return account?.family??null}

export async function GET() { const family=await authFamily(); if(!family)return NextResponse.json({error:"Non authentifié."},{status:401}); const data=await prisma.family.findUnique({where:{id:family.id},include:{children:{orderBy:{createdAt:"asc"}}}}); return NextResponse.json({family:data}); }
export async function POST(request: Request) { const family=await authFamily(); if(!family)return NextResponse.json({error:"Non authentifié."},{status:401}); const body=await request.json() as {firstName?:string;grade?:string;age?:number;interests?:string[];objective?:string}; if(!body.firstName?.trim()||!body.grade?.trim())return NextResponse.json({error:"Prénom et classe requis."},{status:400}); const base=slugify(body.firstName);let slug=base||`enfant-${Date.now()}`;let index=2;while(await prisma.child.findUnique({where:{slug}}))slug=`${base}-${index++}`;const child=await prisma.child.create({data:{slug,firstName:body.firstName.trim(),grade:body.grade.trim(),track:trackFromGrade(body.grade),age:body.age||null,interests:body.interests??[],objective:body.objective?.trim()||null,familyId:family.id}});return NextResponse.json({child}); }
export async function PATCH(request: Request) { const family=await authFamily(); if(!family)return NextResponse.json({error:"Non authentifié."},{status:401}); const body=await request.json() as {slug?:string;firstName?:string;grade?:string;age?:number;interests?:string[];objective?:string;familyName?:string}; if(body.familyName)await prisma.family.update({where:{id:family.id},data:{name:body.familyName.trim()}});if(!body.slug)return NextResponse.json({ok:true});const existing=await prisma.child.findFirst({where:{slug:body.slug,familyId:family.id}});if(!existing)return NextResponse.json({error:"Profil introuvable."},{status:404});const child=await prisma.child.update({where:{id:existing.id},data:{firstName:body.firstName?.trim(),grade:body.grade?.trim(),track:body.grade?trackFromGrade(body.grade):undefined,age:body.age||null,interests:body.interests,objective:body.objective?.trim()||null}});return NextResponse.json({child}); }

export async function DELETE(request: Request) {
  const family = await authFamily();
  if (!family) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug?.trim();
  if (!slug) return NextResponse.json({ error: "Profil enfant requis." }, { status: 400 });

  const child = await prisma.child.findFirst({
    where: { slug, familyId: family.id },
    select: { id: true, firstName: true },
  });

  if (!child) return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });

  await prisma.child.delete({ where: { id: child.id } });

  return NextResponse.json({ ok: true, deletedChild: { slug, firstName: child.firstName } });
}
