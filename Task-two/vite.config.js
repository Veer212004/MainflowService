import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/MainflowService/', // 👈 very important for GitHub Pages
  plugins: [react(), tsconfigPaths()],
})
