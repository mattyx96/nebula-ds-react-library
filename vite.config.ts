/// <reference types="vitest" />
import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';

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
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss('./tailwind.config.mjs'),
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.test{.tsx,.ts}'],
  },
});
