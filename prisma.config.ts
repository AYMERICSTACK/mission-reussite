import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Permet à `prisma generate` de fonctionner avant le branchement de Neon.
    // Une vraie DATABASE_URL restera obligatoire pour les migrations.
    url:
      process.env.DATABASE_URL ??
      "postgresql://placeholder:placeholder@localhost:5432/mission_reussite",
  },
});
