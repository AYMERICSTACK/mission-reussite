import { FamilyManager } from "@/components/family/FamilyManager";
import { prisma } from "@/lib/db/prisma";
import { requireAccount } from "@/lib/auth/session";
export default async function FamilyPage(){const account=await requireAccount();const family=await prisma.family.findUnique({where:{id:account.family!.id},include:{children:{orderBy:{createdAt:"asc"},select:{slug:true,firstName:true,grade:true,age:true,interests:true,objective:true,track:true}}}});return <FamilyManager initialFamilyName={family?.name??"Ma famille"} initialChildren={family?.children??[]}/>}
