import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ IMPORT FIX

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ✅ now defined
  ],
})
