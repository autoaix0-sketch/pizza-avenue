import { defineConfig } from "vite";
import { resolve } from "node:path";

/* Hébergement :
   - GitHub Pages (présentation client) : le workflow .github/workflows/pages.yml
     passe BASE_PATH=/pizza-avenue/ et SITE_URL=https://autoaix0-sketch.github.io/pizza-avenue/
   - nom de domaine propre / Vercel : rien à passer (base "/").
   SITE_URL rend l'image de partage (og:image) absolue : WhatsApp et Facebook
   n'affichent pas une image en chemin relatif. */
const base = process.env.BASE_PATH || "/";
const siteUrl = process.env.SITE_URL || "";

const absoluteShareImage = {
  name: "absolute-share-image",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      if (!siteUrl) return html;
      return html
        .replace('content="/assets/og.jpg"', `content="${siteUrl}assets/og.jpg"`)
        .replace('<meta property="og:type"', `<meta property="og:url" content="${siteUrl}">\n<meta property="og:type"`);
    }
  }
};

export default defineConfig({
  base,
  plugins: [absoluteShareImage],
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
