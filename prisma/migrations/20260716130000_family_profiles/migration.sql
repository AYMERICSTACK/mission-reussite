CREATE TABLE "Family" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Child" ADD COLUMN "track" TEXT NOT NULL DEFAULT 'alyssio';
ALTER TABLE "Child" ADD COLUMN "age" INTEGER;
ALTER TABLE "Child" ADD COLUMN "interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Child" ADD COLUMN "objective" TEXT;
ALTER TABLE "Child" ADD COLUMN "familyId" TEXT;
UPDATE "Child" SET "track" = CASE WHEN "slug" = 'leony' THEN 'leony' ELSE 'alyssio' END;
CREATE INDEX "Child_familyId_idx" ON "Child"("familyId");
ALTER TABLE "Child" ADD CONSTRAINT "Child_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;
