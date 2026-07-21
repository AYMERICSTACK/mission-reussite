CREATE TABLE "CooperationGoal" (
  "id" TEXT NOT NULL,
  "childId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT,
  "targetCount" INTEGER NOT NULL DEFAULT 3,
  "rewardLabel" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  CONSTRAINT "CooperationGoal_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ParentEncouragement" (
  "id" TEXT NOT NULL,
  "childId" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "readAt" TIMESTAMP(3),
  CONSTRAINT "ParentEncouragement_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CooperationGoal_childId_createdAt_idx" ON "CooperationGoal"("childId", "createdAt");
CREATE INDEX "ParentEncouragement_childId_createdAt_idx" ON "ParentEncouragement"("childId", "createdAt");
ALTER TABLE "CooperationGoal" ADD CONSTRAINT "CooperationGoal_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ParentEncouragement" ADD CONSTRAINT "ParentEncouragement_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
