import {cva} from "class-variance-authority";

export const typographyVariants = cva(
  'nb-text',
  {
    variants: {
      variant: {
        display1: 'nb-text--display1',
        display2: 'nb-text--display2',
        header1: 'nb-text--header1',
        header2: 'nb-text--header2',
        header3: 'nb-text--header3',
        header4: 'nb-text--header4',
        header5: 'nb-text--header5',
        header6: 'nb-text--header6',
        body1: 'nb-text--body1',
        body2: 'nb-text--body2',
        body3: 'nb-text--body3',
        body4: 'nb-text--body4',
        body5: 'nb-text--body5',
        button: 'nb-text--button',
        caption: 'nb-text--caption',
      },
    }
  }
);
