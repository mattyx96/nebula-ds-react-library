import {create} from '@storybook/theming/create';
import {lightJsTokens} from 'nebula-ds-tokens';

export const theme: ReturnType<typeof create> = create({
  base: 'light',

  // Brand
  colorPrimary: lightJsTokens.nbCore3500,
  colorSecondary: lightJsTokens.nbCore3500,
  buttonBg: 'transparent',
  buttonBorder: lightJsTokens.nbBackgroundAccent500,

  // UI
  appBg: lightJsTokens.nbBackgroundPrimary,
  appContentBg: lightJsTokens.nbBackgroundPrimary,
  appBorderColor: lightJsTokens.nbBackgroundAccent500,
  appBorderRadius: parseInt(lightJsTokens.nbBorderRadiusDefault.slice(0, -2)),

  // Typography
  fontBase: lightJsTokens.nbFontFamiliesOrbitron,
  fontCode: lightJsTokens.nbFontFamiliesRobotoMono,


  // Text colors
  textColor: lightJsTokens.nbBackgroundContrastPrimary500,
  textInverseColor: lightJsTokens.nbBackgroundPrimary,

  // Toolbar default and active colors
  barTextColor: lightJsTokens.nbBackgroundPrimary,
  barSelectedColor: lightJsTokens.nbSecondary300,
  barBg: lightJsTokens.nbBackgroundContrastPrimary500,

  // Form colors
  inputBg: lightJsTokens.nbBackgroundPrimary,
  inputBorder: lightJsTokens.nbBackgroundAccent500,
  inputTextColor: lightJsTokens.nbBackgroundContrastPrimary500,
  inputBorderRadius: parseInt(
    lightJsTokens.nbInputBorderRadiusMdLgDefault.slice(0, -2)
  ),

  brandTitle: 'Nebula-DS React UI',
  /*brandUrl: 'https://example.com'*/
  brandImage: '/nebula_logo_type.png',
});
