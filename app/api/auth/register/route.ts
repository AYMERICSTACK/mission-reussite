import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { ensureInitialData } from "@/lib/db/bootstrap";

type RegistrationTransaction = Pick<typeof prisma, "parentAccount" | "family">;

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    displayName?: string;
    familyName?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  const displayName = body.displayName?.trim();

  if (!email || !displayName || password.length < 8) {
    return NextResponse.json(
      {
        error:
          "Renseigne un nom, un e-mail valide et un mot de passe d’au moins 8 caractères.",
      },
      { status: 400 },
    );
  }

  const existingAccount = await prisma.parentAccount.findUnique({
    where: { email },
  });

  if (existingAccount) {
    return NextResponse.json(
      { error: "Un compte existe déjà avec cet e-mail." },
      { status: 409 },
    );
  }

  await ensureInitialData();

  const passwordHash = await hashPassword(password);

  const account = await prisma.$transaction(
    async (tx: RegistrationTransaction) => {
      const created = await tx.parentAccount.create({
        data: {
          email,
          displayName,
          passwordHash,
        },
      });

      const legacy = await tx.family.findFirst({
        where: {
          accountId: null,
          id: "family-default",
        },
      });

      if (legacy) {
        await tx.family.update({
          where: {
            id: legacy.id,
          },
          data: {
            accountId: created.id,
            name: body.familyName?.trim() || legacy.name,
          },
        });
      } else {
        await tx.family.create({
          data: {
            accountId: created.id,
            name: body.familyName?.trim() || `Famille ${displayName}`,
          },
        });
      }

      return created;
    },
  );

  await createSession(account.id);

  return NextResponse.json({ ok: true });
}
