import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json() as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase();
  const account = email ? await prisma.parentAccount.findUnique({ where: { email } }) : null;
  if (!account || !(await verifyPassword(body.password ?? "", account.passwordHash))) return NextResponse.json({ error: "E-mail ou mot de passe incorrect." }, { status: 401 });
  await createSession(account.id);
  return NextResponse.json({ ok: true });
}
