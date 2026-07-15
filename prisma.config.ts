import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Com prisma.config.ts o CLI parou de carregar .env sozinho.
// Local: lemos .env.local (convenção Next/Vercel). Na Vercel as vars já vêm
// injetadas no process.env, e o arquivo simplesmente não existe (sem erro).
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
