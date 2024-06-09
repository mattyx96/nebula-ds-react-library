import {tw} from 'nebula-ds-tokens'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...tw.generateTailwindCompatibleTheme(),
    },
  },
  plugins: [
  ],
};
