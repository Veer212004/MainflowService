import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: "/MainflowService/", // ✅ your repo name
  plugins: [
    react(),
    tsconfigPaths(),          // ✅ enables @ alias from jsconfig.json
  ],
})
