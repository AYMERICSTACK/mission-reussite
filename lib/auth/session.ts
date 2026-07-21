import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

import { SESSION_COOKIE } from "@/lib/auth/constants";
export { SESSION_COOKIE } from "@/lib/auth/constants";
const SESSION_DAYS = 30;

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(accountId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.authSession.create({ data: { accountId, tokenHash: tokenHash(token), expiresAt } });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await prisma.authSession.deleteMany({ where: { tokenHash: tokenHash(token) } });
  store.delete(SESSION_COOKIE);
}

export async function getCurrentAccount() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.authSession.findUnique({
    where: { tokenHash: tokenHash(token) },
    include: { account: { include: { family: true } } },
  });
  if (!session || session.expiresAt <= new Date() || !session.account.family) {
    if (session) await prisma.authSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }
  return session.account;
}

export async function requireAccount() {
  const account = await getCurrentAccount();
  if (!account?.family) redirect("/connexion");
  return account;
}
