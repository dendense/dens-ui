import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// GitHub Pages serves the site from /dens-ui/
export default defineConfig({
  base: process.env.DENS_BASE ?? "/dens-ui/",
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 900 },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
})
