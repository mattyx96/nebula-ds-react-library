import {create} from 'storybook/theming/create';
import {lightJsTokens} from 'nebula-ds-tokens';

export const theme: ReturnType<typeof create> = create({
  base: 'light',

  // Brand
  colorPrimary: lightJsTokens.nbPrimary500, // Nebula orange
  colorSecondary: lightJsTokens.nbSecondary500, // Nebula red-orange

  // UI
  appBg: lightJsTokens.nbBackgroundPrimary,
  appContentBg: lightJsTokens.nbBackgroundPrimary,
  appHoverBg: lightJsTokens.nbBackgroundAccent200,
  appPreviewBg: lightJsTokens.nbBackgroundPrimary,
  appBorderColor: lightJsTokens.nbBackgroundAccent500,
  appBorderRadius: parseInt(lightJsTokens.nbBorderRadiusDefault.slice(0, -2)),

  // Typography
  fontBase: lightJsTokens.nbFontFamiliesOrbitron,
  fontCode: lightJsTokens.nbFontFamiliesRobotoMono,

  // Text colors
  textColor: lightJsTokens.nbBackgroundContrastPrimary500,
  textInverseColor: lightJsTokens.nbBackgroundPrimary,
  textMutedColor: lightJsTokens.nbBackgroundContrastPrimary200,

  // Toolbar (LCARS-style dark bar with orange accents)
  barTextColor: lightJsTokens.nbBackgroundPrimary,
  barHoverColor: lightJsTokens.nbBackgroundContrastPrimary200,
  barSelectedColor: lightJsTokens.nbPrimary500,
  barBg: lightJsTokens.nbBackgroundContrastPrimary500,

  // Buttons
  buttonBg: 'transparent',
  buttonBorder: lightJsTokens.nbPrimary500,

  // Boolean controls (switch / checkbox)
  booleanBg: lightJsTokens.nbBackgroundAccent200,
  booleanSelectedBg: lightJsTokens.nbPrimary500,

  // Form colors
  inputBg: lightJsTokens.nbBackgroundPrimary,
  inputBorder: lightJsTokens.nbBackgroundAccent500,
  inputTextColor: lightJsTokens.nbBackgroundContrastPrimary500,
  inputBorderRadius: parseInt(
    lightJsTokens.nbInputBorderRadiusMdLgDefault.slice(0, -2)
  ),

  // Layout grid (matches the token spacing scale)
  gridCellSize: 8,

  brandTitle: 'Nebula Design System',
  brandUrl: 'https://nebula-ds-react-library.irongalaxy.space',
  brandImage: '/nebula_logo_type.png',
  brandTarget: '_self',
});
