import React, { type ComponentPropsWithRef } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { clsxMerge } from '../../common/utils/classNameUtils';
import './button.css';
import {
  buttonIconIconVariants,
  iconButtonVariantsExtendsButton,
} from '../../variants/button/iconButtonVariants.ts';
import { buttonVariants } from '../../variants';

type ButtonElementProps = ComponentPropsWithRef<'button'>;

interface BaseIconButton extends ButtonElementProps {
  icon: React.ReactNode;
  iconClasses?: string;
}

export type IconButtonProps = (BaseIconButton &
  VariantProps<typeof iconButtonVariantsExtendsButton>) &
  (BaseIconButton & VariantProps<typeof buttonVariants>);

export const IconButton = (props: IconButtonProps) => {
  return (
    <button
      className={clsxMerge(
        buttonVariants({
          size: props.size,
          rounded: props.rounded,
          variant: props.variant,
        }),
        iconButtonVariantsExtendsButton({
          size: props.size,
        }),
        props.className
      )}
      type="button"
      {...props}
    >
      <div
        className={clsxMerge(
          buttonIconIconVariants({ size: props.size, rounded: props.rounded })
        )}
      >
        {props.icon}
      </div>
    </button>
  );
};
