import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Yeh line top par add karein

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 2. Yeh alias block add karein jo duplicate React ko aane se rokega
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
})