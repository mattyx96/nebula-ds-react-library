import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'nb-button',
  {
    variants: {
      variant: {
        filled: 'nb-button--filled',
        standard: 'nb-button--standard',
        text: 'nb-button--text',
        outlined: 'nb-button--outlined',
      },
      size: {
        S: 'nb-button--size-s',
        M: 'nb-button--size-m',
        L: 'nb-button--size-l',
      },
      rounded: {
        Default: 'nb-button--rounded-default',
        R: 'nb-button--rounded-r',
        L: 'nb-button--rounded-l',
        RTop: 'nb-button--rounded-rtop',
        RBottom: 'nb-button--rounded-rbottom',
        LTop: 'nb-button--rounded-ltop',
        LBottom: 'nb-button--rounded-lbottom',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'M',
      rounded: 'Default',
    },
  }
);
