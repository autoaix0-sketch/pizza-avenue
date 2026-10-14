import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 4178 },
  preview: { port: 4178 },
  build: {
    target: "es2019",
    assetsInlineLimit: 0
  }
});
