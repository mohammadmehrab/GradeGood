/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  envDir: path.resolve(__dirname, '../'),
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
