import React, { type ComponentPropsWithRef } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { clsxMerge } from '../../common/utils/classNameUtils';
import { Icon } from '../icon/icon.tsx';
import { buttonVariants } from '../../variants';

type ButtonElementProps = ComponentPropsWithRef<'button'>;

export interface ButtonPropsBase
  extends ButtonElementProps,
    VariantProps<typeof buttonVariants> {}

export interface ButtonWithTextProps extends ButtonPropsBase {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
}

export type ButtonProps = ButtonWithTextProps;

export default function Button(props: ButtonProps) {
  const { leftIcon, rightIcon, text, children, ...rest } = props;
  return (
    <button
      className={clsxMerge(
        buttonVariants({
          size: props.size,
          rounded: props.rounded,
          variant: props.variant,
        }),
        props.className
      )}
      type="button"
      {...rest}
    >
      {Boolean(leftIcon) && <Icon size={props.size}>{leftIcon}</Icon>}
      {Boolean(text) && text}
      {Boolean(children) && children}
      {Boolean(rightIcon) && <Icon size={props.size}>{rightIcon}</Icon>}
    </button>
  );
}
