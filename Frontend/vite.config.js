import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//Hello David

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
})
