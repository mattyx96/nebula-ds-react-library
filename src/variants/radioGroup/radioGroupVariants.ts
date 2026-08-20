import {cva} from 'class-variance-authority';

export const radioGroupVariants = cva(
  'nb-radio-group',
  {
    variants: {
      orientation: {
        horizontal: 'nb-radio-group--horizontal',
        vertical: 'nb-radio-group--vertical',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export const radioItemVariants = cva(
  'nb-radio',
  {
    variants: {
      size: {
        S: 'nb-radio--size-s',
        M: 'nb-radio--size-m',
        L: 'nb-radio--size-l',
      },
      rounded: {
        Default: 'nb-radio--rounded-default',
        R: 'nb-radio--rounded-r',
        L: 'nb-radio--rounded-l',
        RTop: 'nb-radio--rounded-rtop',
        RBottom: 'nb-radio--rounded-rbottom',
        LTop: 'nb-radio--rounded-ltop',
        LBottom: 'nb-radio--rounded-lbottom',
      },
    },
    defaultVariants: {
      size: 'M',
      rounded: 'Default',
    },
  }
);
