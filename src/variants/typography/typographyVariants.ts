import {cva} from "class-variance-authority";

export const typographyVariants = cva(
  '',
  {
    variants: {
      variant: {
        display1: 'display1',
        display2: 'display2',
        header1: 'header1',
        header2: 'header2',
        header3: 'header3',
        header4: 'header4',
        header5: 'header5',
        header6: 'header6',
        body1: 'body1',
        body2: 'body2',
        body3: 'body3',
        body4: 'body4',
        body5: 'body5',
        button: 'button',
        caption: 'caption',
      },
      weight: {
        default: '',
        light: 'font-light',
        bold: 'font-bold',
        bolder: 'font-extrabold',
      },
    },
    defaultVariants: {
      weight: 'default',
    },
  }
);
