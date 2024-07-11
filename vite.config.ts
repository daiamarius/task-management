import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import checker from 'vite-plugin-checker';
import eslint from '@nabla/vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteTsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 4000,
    open: 'http://localhost:4000'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
