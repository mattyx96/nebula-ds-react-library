import React, {type ComponentPropsWithRef} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {
  buttonIconIconVariants,
  iconButtonVariantsExtendsButton,
} from '../../variants/button/iconButtonVariants.ts';
import {buttonVariants} from '../../variants';
import {ButtonVariants, IconButtonVariants} from "../../variants/button";
import './IconButton.css';

type ButtonElementProps = ComponentPropsWithRef<'button'>;

interface BaseIconButton extends ButtonElementProps {
  /** Icon content — required. Sized by the wrapper div (`size`). */
  icon: React.ReactNode;
}

export type IconButtonProps = (BaseIconButton & IconButtonVariants) & ButtonVariants;

/**
 * Icon-only button. Same `variant`/`size`/`rounded` vocabulary as `Button`.
 * The icon is centered in a size-specific wrapper; give the button an
 * accessible name via `aria-label` (icons carry none by themselves).
 */
export const IconButton = (props: IconButtonProps) => {
  const {icon, className, size, variant, rounded, ...rest} = props;

  return (
    <button
      className={clsxMerge(
        buttonVariants({
          size,
          rounded,
          variant,
        }),
        iconButtonVariantsExtendsButton({
          size,
        }),
        className
      )}
      type="button"
      {...rest}
    >
      <div
        className={clsxMerge(
          buttonIconIconVariants({size, rounded})
        )}
      >
        {icon}
      </div>
    </button>
  );
};
