import {cva} from 'class-variance-authority';

export const selectVariants = cva(
  'nb-select',
  {
    variants: {
      size: {
        S: 'nb-select--size-s',
        M: 'nb-select--size-m',
        L: 'nb-select--size-l',
      },
      align: {
        start: 'nb-select--align-start',
        center: 'nb-select--align-center',
        end: 'nb-select--align-end',
      },
    },
    defaultVariants: {
      size: 'M',
      align: 'start',
    },
  },
);

export const selectContentVariants = cva(
  'nb-select__content',
  {
    variants: {
      round: {
        no: 'nb-select__content--round-no',
        xs: 'nb-select__content--round-xs',
        lg: 'nb-select__content--round-lg',
      },
      outline: {
        '700': 'nb-select__content--outline-700',
        '500': 'nb-select__content--outline-500',
        '200': 'nb-select__content--outline-200',
        '50': 'nb-select__content--outline-50',
      },
    },
    defaultVariants: {
      round: 'no',
      outline: '500',
    },
  },
);
