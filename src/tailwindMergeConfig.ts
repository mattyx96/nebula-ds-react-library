import {tw} from 'nebula-ds-tokens';
import {extendTailwindMerge} from 'tailwind-merge';

type Tokens = {
  color?: Record<string, string>;
  spacing?: Record<string, string>;
  fontFamilies?: Record<string, string>;
  lineHeights?: Record<string, string>;
  fontWeights?: Record<string, string>;
  fontSizes?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  borderWidth?: Record<string, string>;
  ringWidth?: Record<string, string>;
  borderRadius?: Record<string, string>;
  opacity?: Record<string, string>;
  height?: Record<string, string>;
  width?: Record<string, string>;
  // Add other token categories as needed
};

const transformTokens = (
  tokens: Tokens
): { [key in keyof Tokens]: string[] } => {
  return Object.keys(tokens).reduce(
    (acc, type) => {
      // Asserting type to keyof Tokens to resolve TS7053
      acc[type as keyof Tokens] = Object.keys(
        tokens[type as keyof Tokens] || {}
      );
      return acc;
    },
    {} as { [key in keyof Tokens]: string[] }
  );
};

window.console.log(
  'tw merge: ',
  transformTokens(tw.generateTailwindCompatibleTheme())
);

const twMerge = extendTailwindMerge({
  // ↓ Add values to existing theme scale or create a new one
  extend: {
    classGroups: {
      'font-size': ['font-orbitron', 'font-orbitron-3'],
    },
    theme: {
      ...transformTokens(tw.generateTailwindCompatibleTheme()),
    },
  },
});

export default twMerge;
