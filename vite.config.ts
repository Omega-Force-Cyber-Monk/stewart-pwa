import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "favicon.svg",
        "icons.svg",
        "pwa-icon.svg",
        "pwa-192x192.svg",
        "pwa-512x512.svg",
        "pwa-maskable.svg",
        "apple-touch-icon.svg",
      ],
      manifest: {
        name: "QuitTheApp",
        short_name: "QuitTheApp",
        description: "Transportation Business Launch Platform",
        theme_color: "#0891b2",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/pwa-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
          {
            src: "/pwa-maskable.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "/apple-touch-icon.svg",
            sizes: "180x180",
            type: "image/svg+xml",
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api(?:\/|$)/],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ request, url, sameOrigin }) =>
              sameOrigin && request.mode !== "navigate" && !url.pathname.startsWith("/api"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-cache",
            },
          },
        ],
      },
    }),
  ],
});
