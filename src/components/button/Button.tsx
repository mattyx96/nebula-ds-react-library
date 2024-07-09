import React, {type ComponentPropsWithRef} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {Icon} from '../icon/Icon.tsx';
import {buttonVariants} from '../../variants';
import {ButtonVariants} from "../../variants/button";
import {Text} from "../typography/Typography.tsx";

type ButtonElementProps = ComponentPropsWithRef<'button'>;

interface ButtonPropsBase
  extends ButtonElementProps,
    ButtonVariants {
}

export interface ButtonWithTextProps extends ButtonPropsBase {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
}

export type ButtonProps = ButtonWithTextProps;

export const Button = (props: ButtonProps) => {
  const {leftIcon, rightIcon, text, children, className, ...rest} = props;

  return (
    <button
      className={clsxMerge(
        buttonVariants({
          size: props.size,
          rounded: props.rounded,
          variant: props.variant,
        }),
        className
      )}
      type="button"
      {...rest}
    >
      {Boolean(leftIcon) && <Icon size={props.size}>{leftIcon}</Icon>}
      {Boolean(text) && <Text component="span" variant="button">{text}</Text>}
      {Boolean(children) && children}
      {Boolean(rightIcon) && <Icon size={props.size}>{rightIcon}</Icon>}
    </button>
  );
}
