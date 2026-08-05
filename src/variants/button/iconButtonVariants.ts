import {cva} from 'class-variance-authority';

export const iconButtonVariantsExtendsButton = cva(
  'nb-icon-button',
  {
    variants: {
      size: {
        L: 'nb-icon-button--size-l',
        M: 'nb-icon-button--size-m',
        S: 'nb-icon-button--size-s',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  }
);

export const buttonIconIconVariants = cva(
  'nb-icon-button__icon',
  {
    variants: {
      size: {
        S: 'nb-icon-button__icon--size-s',
        M: 'nb-icon-button__icon--size-m',
        L: 'nb-icon-button__icon--size-l',
      },
      rounded: {
        Default: '',
        R: '',
        L: '',
        RTop: '',
        RBottom: '',
        LTop: '',
        LBottom: '',
      },
    },
    defaultVariants: {
      size: 'M',
      rounded: 'Default',
    },
  }
);
