// Importing anything in a d.ts file will break interface merging (Astro/Vite uses it)
// So instead, we create and declare env variables in its own globals file.

import type { Env } from "./utils/env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
