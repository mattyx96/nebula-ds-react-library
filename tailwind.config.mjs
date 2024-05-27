import { generateTailwindCompatibleTheme } from './theme.ts';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...generateTailwindCompatibleTheme(),
    },
  },
  plugins: [],
};
