import React, { type ComponentPropsWithRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsxMerge } from '../../common/utils/classNameUtils';
import './button.css';

type ButtonElementProps = ComponentPropsWithRef<'button'>;

interface BaseIconButton extends ButtonElementProps {
  icon: React.ReactNode;
  iconClasses?: string;
}

export type IconButtonProps = (BaseIconButton &
  VariantProps<typeof iconStyles>) &
  (BaseIconButton & VariantProps<typeof buttonStyles>);

export const IconButton = (props: IconButtonProps) => {
  return (
    <button
      className={clsxMerge(
        buttonStyles({
          size: props.size,
          rounded: props.rounded,
          variant: props.variant,
        }),
        props.className
      )}
      type="button"
      {...props}
    >
      <div
        className={clsxMerge(
          iconStyles({
            size: props.size,
            rounded: props.rounded,
          }),
          props.iconClasses
        )}
      >
        {props.icon}
      </div>
    </button>
  );
};

const buttonStyles = cva(
  `
    relative flex
    font-orbitron font-orbitron-3 text-button-text-color-default leading-2 text-2
    border-border-2 border-button-default
    hover:border-background-contrast-primary-500
    active:border-button-background-secondary 
    active:bg-button-background-pressed 
    focus:outline-0 focus:border-background-contrast-primary-500 
  `,
  {
    variants: {
      variant: {
        filled: `bg-button-background-primary text-button-text-color-primary`,
        standard: 'bg-gray-200 border-gray-200 hover:bg-gray-300',
        text: 'bg-yellow-500 border-yellow-500 hover:bg-yellow-600',
        outlined:
          'bg-white hover:bg-gray-100 border hover:border-gray-100 border-gray-300 hover:shadow-md',
      },
      size: {
        L: 'h-button-lg w-button-lg',
        M: 'h-button-md w-button-md',
        S: 'h-button-sm w-button-sm',
      },
      rounded: {
        Default: '',
        R: '',
        L: '',
        RTop: '',
        RBottom: '',
        LTop: '',
        LBottom: '',
        Full: 'rounded-full',
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

const iconStyles = cva(
  `
  absolute m-auto left-0 right-0 top-0 bottom-0
`,
  {
    variants: {
      size: {
        S: 'h-6 w-6',
        M: 'h-6 w-6',
        L: 'h-6 w-6',
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
