import {tw} from 'nebula-ds-tokens'
import tokens from 'nebula-ds-tokens/build/light-tokens.json'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...tw.generateTailwindCompatibleTheme(tokens),
    },
  },
  plugins: [],
};
