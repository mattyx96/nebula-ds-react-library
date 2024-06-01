/// <reference types="vitest" />
import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';
import copy from 'rollup-plugin-copy';
import tailwindcss from "tailwindcss";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

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
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
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
  plugins: [react(), dts({include: ["lib"], insertTypesEntry: true}), cssInjectedByJsPlugin(), copy({
    targets: [
      {src: 'src/index.css', dest: 'dist'},
    ],
    hook: 'closeBundle',
  }),],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  }
});
