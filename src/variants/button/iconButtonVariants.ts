import {cva} from 'class-variance-authority';

export const iconButtonVariantsExtendsButton = cva(
  `relative flex !px-0 !py-0`, //todo fix: tailwind merge config
  {
    variants: {
      size: {
        L: 'min-h-button-lg min-w-button-lg',
        M: 'min-h-button-md min-w-button-md',
        S: 'min-h-button-sm min-w-button-sm',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  }
);

export const buttonIconIconVariants = cva(
  `
  absolute m-auto left-0 right-0 top-0 bottom-0
`,
  {
    variants: {
      size: {
        S: 'w-5 h-5',
        M: 'w-6 h-6',
        L: 'w-7 h-7',
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
    compoundVariants: [
      {
        size: ['S'],
        rounded: ['R', 'RTop', 'RBottom'],
        class: 'translate-button-spacing-xs-compensation-diff-l', //todo fix compensation
      },
      {
        size: ['S'],
        rounded: ['L', 'LTop', 'LBottom'],
        class: 'translate-button-spacing-xs-compensation-diff-r',
      },
      {
        size: ['M'],
        rounded: ['R', 'RTop', 'RBottom'],
        class: 'translate-button-spacing-md-compensation-diff-l',
      },
      {
        size: ['M'],
        rounded: ['L', 'LTop', 'LBottom'],
        class: 'translate-button-spacing-md-compensation-diff-r',
      },
      {
        size: ['L'],
        rounded: ['R', 'RTop', 'RBottom'],
        class: 'translate-button-spacing-lg-compensation-diff-l',
      },
      {
        size: ['L'],
        rounded: ['L', 'LTop', 'LBottom'],
        class: 'translate-button-spacing-lg-compensation-diff-r',
      },
    ],
    defaultVariants: {
      size: 'M',
      rounded: 'Default',
    },
  }
);
