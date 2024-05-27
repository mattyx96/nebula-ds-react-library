import { utilities } from 'nebula-ds-tokens';
import tokens from 'nebula-ds-tokens/build/light-tokens.json';

export const generateTailwindCompatibleTheme = () => {
  const colors = utilities.filterTokensByType('color', tokens);
  const spacing = utilities.filterTokensByType('spacing', tokens);
  const fontFamilies = utilities.filterTokensByType('fontFamilies', tokens);
  const lineHeights = utilities.filterTokensByType('lineHeights', tokens);
  const fontWeights = utilities.filterTokensByType('fontWeights', tokens);
  const fontSizes = utilities.filterTokensByType('fontSizes', tokens);
  const letterSpacing = utilities.filterTokensByType('letterSpacing', tokens);
  const borderWidth = utilities.filterTokensByType('borderWidth', tokens);
  const borderRadius = utilities.filterTokensByType('borderRadius', tokens);
  const opacity = utilities.filterTokensByType('opacity', tokens);
  const sizing = utilities.filterTokensByType('sizing', tokens);

  return {
    colors,
    spacing,
    // @ts-expect-error object not type safe
    fontFamily: fontFamilies.fontFamilies,
    // @ts-expect-error object not type safe
    fontWeight: fontWeights.fontWeights,
    // @ts-expect-error object not type safe
    lineHeight: lineHeights.lineHeights,
    // @ts-expect-error object not type safe
    fontSize: fontSizes.fontSize,
    // @ts-expect-error object not type safe
    letterSpacing: letterSpacing.letterSpacing,
    borderWidth,
    borderRadius,
    opacity,
    width: sizing,
    height: sizing,
  };
};
