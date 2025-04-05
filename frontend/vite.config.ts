/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  plugins: [react()],
  envDir: path.resolve(__dirname, '../'),
  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
