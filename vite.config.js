import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // GitHub Pages hosts this repository under /employee-dashboard/.
  base: command === 'build' ? '/employee-dashboard/' : '/',
}));
