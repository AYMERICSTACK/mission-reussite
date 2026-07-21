CREATE TABLE "ParentAccount" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ParentAccount_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ParentAccount_email_key" ON "ParentAccount"("email");

CREATE TABLE "AuthSession" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "accountId" TEXT NOT NULL,
  CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AuthSession_tokenHash_key" ON "AuthSession"("tokenHash");
CREATE INDEX "AuthSession_accountId_idx" ON "AuthSession"("accountId");
CREATE INDEX "AuthSession_expiresAt_idx" ON "AuthSession"("expiresAt");
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ParentAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Family" ADD COLUMN "accountId" TEXT;
CREATE UNIQUE INDEX "Family_accountId_key" ON "Family"("accountId");
ALTER TABLE "Family" ADD CONSTRAINT "Family_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ParentAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
