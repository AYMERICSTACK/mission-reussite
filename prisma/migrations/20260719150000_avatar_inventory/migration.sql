CREATE TABLE "ChildGameProfile" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "claimedChests" INTEGER NOT NULL DEFAULT 0,
    "unlockedItemIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "equippedBody" TEXT NOT NULL DEFAULT 'body-explorer',
    "equippedOutfit" TEXT,
    "equippedHead" TEXT,
    "equippedAccessory" TEXT,
    "equippedCompanion" TEXT DEFAULT 'companion-oscar',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ChildGameProfile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ChildGameProfile_childId_key" ON "ChildGameProfile"("childId");
ALTER TABLE "ChildGameProfile" ADD CONSTRAINT "ChildGameProfile_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
