import React, {type ComponentPropsWithRef} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {Icon} from '../icon/Icon.tsx';
import {buttonVariants} from '../../variants';
import {ButtonVariants} from "../../variants/button";
import './Button.css';

type ButtonElementProps = ComponentPropsWithRef<'button'>;

interface ButtonPropsBase
  extends ButtonElementProps,
    ButtonVariants {
}

export interface ButtonWithTextProps extends ButtonPropsBase {
  /** Icon rendered before the label, wrapped in `<Icon>` (sized by `size`). */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label, wrapped in `<Icon>` (sized by `size`). */
  rightIcon?: React.ReactNode;
  /**
   * Label text. Prefer `children` for anything richer than a plain string;
   * `text` and `children` are **both** rendered when both are passed
   * (order: `leftIcon`, `text`, `children`, `rightIcon`).
   */
  text?: string;
}

export type ButtonProps = ButtonWithTextProps;

/**
 * The Nebula action button.
 *
 * Variant semantics (names are fixed — see docs/DESIGN_LANGUAGE.md):
 * `filled` is the single primary action per view/panel; `standard` is for
 * secondary actions and groups; `outlined` for tertiary emphasis; `text`
 * for inline/quiet actions.
 *
 * Renders a native `<button type="button">` — pass `type="submit"` inside
 * forms (the spread of native props comes after, so it overrides the
 * default). For links, wrap the button in `<a>`; there is no `href` prop.
 */
export const Button = (props: ButtonProps) => {
  const {leftIcon, rightIcon, text, children, className, size, variant, rounded, ...rest} = props;

  return (
    <button
      className={clsxMerge(
        buttonVariants({
          size,
          rounded,
          variant,
        }),
        className
      )}
      type="button"
      {...rest}
    >
      {Boolean(leftIcon) && <Icon size={size}>{leftIcon}</Icon>}
      {Boolean(text) && text}
      {Boolean(children) && children}
      {Boolean(rightIcon) && <Icon size={size}>{rightIcon}</Icon>}
    </button>
  );
}
