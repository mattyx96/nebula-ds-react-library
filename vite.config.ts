/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'nebula-ds-react-library',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
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
  plugins: [
    react(),
    dts({
      include: ['index.ts', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.ts',
        'src/**/*.stories.tsx',
      ],
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
  css: {},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.test{.tsx,.ts}'],
  },
});
