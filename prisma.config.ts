import { defineConfig } from "prisma/config";

// Substitui o antigo "prisma" em package.json (deprecado no Prisma 7).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
