import {forwardRef, useId, type ComponentPropsWithRef} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import type {InputRounded, InputSize, InputVariant} from '../../variants/input';
import {inputVariants} from '../../variants/input';
import './Input.css';

type InputElementProps = Omit<ComponentPropsWithRef<'input'>, 'size'>;

export interface InputProps extends InputElementProps {
  /** Label rendered above the input. */
  label?: string;
  /** Custom content for the label slot (replaces `label`). */
  labelContent?: React.ReactNode;
  /** Text shown as a helper/description under the input. */
  helperText?: string;
  /** Error messages rendered under the input. */
  errors?: string[];
  size?: InputSize;
  variant?: InputVariant;
  rounded?: InputRounded;
  /** Whether the input grows to fill its container width. */
  fullWidth?: boolean;
  /** Renders a required asterisk next to the label. */
  isRequired?: boolean;
  className?: string;
  labelClassName?: string;
}

/**
 * Text input. Handles label, errors, helper text and the design-system
 * variants/sizes/rounding. The standard input of the design system.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelContent,
      helperText,
      errors,
      size,
      variant,
      rounded,
      fullWidth,
      isRequired,
      className,
      labelClassName,
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const isInvalid = Boolean(errors && errors.length > 0);

    return (
      <div className={clsxMerge('nb-input__wrapper', fullWidth && 'nb-input__wrapper--full', className)}>
        {(label || labelContent) && (
          <label htmlFor={inputId} className={clsxMerge('nb-input__label', labelClassName)}>
            {labelContent ?? (
              <>
                {label}
                {Boolean(isRequired) && <span className="nb-input__required">*</span>}
              </>
            )}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={isInvalid || undefined}
          className={clsxMerge(
            inputVariants({size, variant, rounded}),
            isInvalid && 'nb-input--invalid',
            rest.disabled && 'nb-input__field--disabled',
          )}
          {...rest}
        />
        {isInvalid ? (
          <span className="nb-input__error">{errors?.map((e, i) => <span key={i}>{e}</span>)}</span>
        ) : (
          Boolean(helperText) && <span className="nb-input__helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
