import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import checker from 'vite-plugin-checker';
import eslint from '@nabla/vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteTsconfigPaths(),
    checker({
      typescript: true,
    }),
    compression()
  ],
  server: {
    port: 4000,
    open: 'http://localhost:4000'
  },
  preview: {
    port: 4001,
    open: 'http://localhost:4001'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
