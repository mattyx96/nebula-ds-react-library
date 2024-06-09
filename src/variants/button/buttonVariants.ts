import { cva } from 'class-variance-authority'; //todo: fix border-border-2 it should be border-2

//todo: fix border-border-2 it should be border-2
export const buttonVariants = cva(
  `
    flex flex-row items-center justify-center gap-3
    font-orbitron font-orbitron-3 text-button-text-color-default leading-2 text-2
    ring-border-1
    hover:ring-background-contrast-primary-500
    hover:ring-border-2
    active:ring-button-background-secondary 
    active:bg-button-background-pressed 
    focus:outline-0 focus:ring-background-contrast-primary-500 
    disabled:cursor-not-allowed
    disabled:opacity-button-opacity-disabled
  `,
  {
    variants: {
      variant: {
        filled: `bg-button-background-primary text-button-text-color-primary ring-button-background-primary`,
        standard: 'ring-background-accent-200',
        text: 'ring-transparent',
        outlined:
          'ring-button-background-primary hover:ring-button-background-primary',
      },
      size: {
        S: 'px-button-spacing-xs-h-default py-button-spacing-xs-v-default h-button-sm', //todo: fix should be xs instead of sm
        M: 'px-button-spacing-md-h-default py-button-spacing-md-v-default h-button-md',
        L: 'px-button-spacing-lg-h-default py-button-spacing-lg-v-default h-button-lg',
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
        size: ['M', 'L'],
        rounded: ['Default'],
        class: 'rounded-button-border-radius-md-lg-default',
      },
      {
        size: ['S'],
        rounded: ['Default'],
        class: 'rounded-button-border-radius-xs-default',
      },
      {
        size: ['S'],
        rounded: ['R'],
        class:
          'rounded-l-button-border-radius-xs-default rounded-r-button-border-radius-xs-big',
      },
      {
        size: ['M'],
        rounded: ['R'],
        class:
          'rounded-l-button-border-radius-md-lg-default rounded-r-button-border-radius-md-big',
      },
      {
        size: ['L'],
        rounded: ['R'],
        class:
          'rounded-l-button-border-radius-md-lg-default rounded-r-button-border-radius-lg-big',
      },
      {
        size: ['S'],
        rounded: ['L'],
        class:
          'rounded-r-button-border-radius-xs-default rounded-l-button-border-radius-xs-big',
      },
      {
        size: ['M'],
        rounded: ['L'],
        class:
          'rounded-r-button-border-radius-md-lg-default rounded-l-button-border-radius-md-big',
      },
      {
        size: ['L'],
        rounded: ['L'],
        class:
          'rounded-r-button-border-radius-md-lg-default rounded-l-button-border-radius-lg-big',
      },

      {
        size: ['S'],
        rounded: ['LBottom'],
        class: `
            rounded-br-button-border-radius-xs-default 
            rounded-tr-button-border-radius-xs-default 
            rounded-tl-button-border-radius-xs-default 
            rounded-bl-button-border-radius-xs-big
            pr-button-spacing-xs-compensation
          `,
      },
      {
        size: ['M'],
        rounded: ['LBottom'],
        class: `
            rounded-br-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default
            rounded-bl-button-border-radius-md-big
            pr-button-spacing-md-compensation
          `,
      },
      {
        size: ['L'],
        rounded: ['LBottom'],
        class: `
            rounded-br-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default
            rounded-bl-button-border-radius-lg-big
            pr-button-spacing-lg-compensation
          `,
      },

      {
        size: ['S'],
        rounded: ['RBottom'],
        class: `
            rounded-bl-button-border-radius-xs-default 
            rounded-tl-button-border-radius-xs-default 
            rounded-tr-button-border-radius-xs-default 
            rounded-br-button-border-radius-xs-big
            pl-button-spacing-xs-compensation
          `,
      },
      {
        size: ['M'],
        rounded: ['RBottom'],
        class: `
            rounded-bl-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default
            rounded-br-button-border-radius-md-big
            pl-button-spacing-md-compensation
          `,
      },
      {
        size: ['L'],
        rounded: ['RBottom'],
        class: `
            rounded-bl-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default
            rounded-br-button-border-radius-lg-big
            pl-button-spacing-lg-compensation
          `,
      },

      {
        size: ['S'],
        rounded: ['LTop'],
        class: `
            rounded-bl-button-border-radius-xs-default 
            rounded-br-button-border-radius-xs-default 
            rounded-tr-button-border-radius-xs-default 
            rounded-tl-button-border-radius-xs-big
            pl-button-spacing-xs-compensation
          `,
      },
      {
        size: ['M'],
        rounded: ['LTop'],
        class: `
            rounded-bl-button-border-radius-md-lg-default 
            rounded-br-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default
            rounded-tl-button-border-radius-md-big
            pl-button-spacing-md-compensation
          `,
      },
      {
        size: ['L'],
        rounded: ['LTop'],
        class: `
            rounded-bl-button-border-radius-md-lg-default 
            rounded-br-button-border-radius-md-lg-default 
            rounded-tr-button-border-radius-md-lg-default
            rounded-tl-button-border-radius-lg-big
            pl-button-spacing-lg-compensation
          `,
      },

      {
        size: ['S'],
        rounded: ['RTop'],
        class: `
            rounded-br-button-border-radius-xs-default 
            rounded-bl-button-border-radius-xs-default 
            rounded-tl-button-border-radius-xs-default 
            rounded-tr-button-border-radius-xs-big
            pr-button-spacing-xs-compensation
          `,
      },
      {
        size: ['M'],
        rounded: ['RTop'],
        class: `
            rounded-br-button-border-radius-md-lg-default 
            rounded-bl-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default
            rounded-tr-button-border-radius-md-big
            pr-button-spacing-md-compensation
          `,
      },
      {
        size: ['L'],
        rounded: ['RTop'],
        class: `
            rounded-br-button-border-radius-md-lg-default 
            rounded-bl-button-border-radius-md-lg-default 
            rounded-tl-button-border-radius-md-lg-default
            rounded-tr-button-border-radius-lg-big
            pr-button-spacing-lg-compensation
          `,
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'M',
      rounded: 'Default',
    },
  }
);
