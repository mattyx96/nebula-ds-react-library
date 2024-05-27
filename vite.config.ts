import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react'; /// <reference types="vitest" />
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'serif-ui-components',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.test{.tsx,.ts}'],
  },
  plugins: [react(), dts()],
});
