import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react'; /// <reference types="vitest" />
import path from 'path';
import copy from 'rollup-plugin-copy';
import tailwindcss from "tailwindcss";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'nebula-ds-react-library',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
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
  plugins: [react(), dts(), copy({
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
