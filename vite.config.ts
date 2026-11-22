import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// GitHub Pages serves the site from /dens-ui/
export default defineConfig({
  base: process.env.DENS_BASE ?? "/dens-ui/",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    // the docs site, plus the dens.fm music landing as its own page
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        music: path.resolve(import.meta.dirname, "music.html"),
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
})
