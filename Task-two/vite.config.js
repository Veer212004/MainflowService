import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: "/MainflowService/", // ✅ Correct base for GitHub Pages
  plugins: [
    react(),                 // ✅ React support
    tsconfigPaths(),         // ✅ Supports @ paths from jsconfig/tsconfig
  ],
})
