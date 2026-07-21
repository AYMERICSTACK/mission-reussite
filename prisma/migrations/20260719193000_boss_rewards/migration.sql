ALTER TABLE "ChildGameProfile"
ADD COLUMN "defeatedBossIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "bossTrophyIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "legendaryChestIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
