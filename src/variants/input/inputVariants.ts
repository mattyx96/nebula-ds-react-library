import {cva} from 'class-variance-authority';

export const inputVariants = cva(
  'nb-input',
  {
    variants: {
      variant: {
        filled: 'nb-input--filled',
        standard: 'nb-input--standard',
        outlined: 'nb-input--outlined',
        text: 'nb-input--text',
      },
      size: {
        S: 'nb-input--size-s',
        M: 'nb-input--size-m',
        L: 'nb-input--size-l',
      },
      rounded: {
        Default: 'nb-input--rounded-default',
        R: 'nb-input--rounded-r',
        L: 'nb-input--rounded-l',
        RTop: 'nb-input--rounded-rtop',
        RBottom: 'nb-input--rounded-rbottom',
        LTop: 'nb-input--rounded-ltop',
        LBottom: 'nb-input--rounded-lbottom',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'M',
      rounded: 'Default',
    },
  }
);
