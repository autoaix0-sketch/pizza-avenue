import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  server: { port: 4178 },
  preview: { port: 4178 },
  build: {
    target: "es2019",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        legal: resolve(__dirname, "mentions-legales.html")
      }
    }
  }
});
