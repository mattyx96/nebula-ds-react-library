import {cva} from 'class-variance-authority';

export const menuVariants = cva(
  'nb-menu',
  {
    variants: {
      size: {
        S: 'nb-menu--size-s',
        M: 'nb-menu--size-m',
        L: 'nb-menu--size-l',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  },
);

export const menuContentVariants = cva(
  'nb-menu__content',
  {
    variants: {
      round: {
        no: 'nb-menu__content--round-no',
        xs: 'nb-menu__content--round-xs',
        lg: 'nb-menu__content--round-lg',
      },
      outline: {
        '700': 'nb-menu__content--outline-700',
        '500': 'nb-menu__content--outline-500',
        '200': 'nb-menu__content--outline-200',
        '50': 'nb-menu__content--outline-50',
      },
    },
    defaultVariants: {
      round: 'no',
      outline: '500',
    },
  },
);
