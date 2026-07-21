ALTER TABLE "ChildGameProfile" ADD COLUMN "bonusXp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "sideQuestBadgeIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

CREATE TABLE "SideQuestProgress" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SideQuestProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SideQuestProgress_childId_questId_key" ON "SideQuestProgress"("childId", "questId");
CREATE INDEX "SideQuestProgress_childId_idx" ON "SideQuestProgress"("childId");
ALTER TABLE "SideQuestProgress" ADD CONSTRAINT "SideQuestProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
