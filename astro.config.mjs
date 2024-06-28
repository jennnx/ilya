import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { initEnv } from "./src/utils/env";
import node from "@astrojs/node";
initEnv();

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [solidJs(), tailwind()],
  experimental: {
    actions: true,
  },
  adapter: node({
    mode: "standalone",
  }),
});
