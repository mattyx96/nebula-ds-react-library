import {cva} from 'class-variance-authority';

export const checkboxVariants = cva(
  'nb-checkbox',
  {
    variants: {
      size: {
        S: 'nb-checkbox--size-s',
        M: 'nb-checkbox--size-m',
        L: 'nb-checkbox--size-l',
      },
      rounded: {
        Default: 'nb-checkbox--rounded-default',
        R: 'nb-checkbox--rounded-r',
        L: 'nb-checkbox--rounded-l',
        RTop: 'nb-checkbox--rounded-rtop',
        RBottom: 'nb-checkbox--rounded-rbottom',
        LTop: 'nb-checkbox--rounded-ltop',
        LBottom: 'nb-checkbox--rounded-lbottom',
      },
    },
    defaultVariants: {
      size: 'M',
      rounded: 'Default',
    },
  }
);
