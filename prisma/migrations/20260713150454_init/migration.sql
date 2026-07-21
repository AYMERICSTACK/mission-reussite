-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "mistakes" INTEGER NOT NULL,
    "hintsUsed" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Child_slug_key" ON "Child"("slug");

-- CreateIndex
CREATE INDEX "Attempt_childId_completedAt_idx" ON "Attempt"("childId", "completedAt");

-- CreateIndex
CREATE INDEX "Attempt_missionId_idx" ON "Attempt"("missionId");

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
