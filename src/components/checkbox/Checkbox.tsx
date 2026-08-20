import {useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as checkbox from '@zag-js/checkbox';
import {normalizeProps, useMachine} from '@zag-js/react';
import {CheckIcon, MinusIcon} from '@heroicons/react/24/solid';
import {clsxMerge} from '../../common/utils/classNameUtils';
import type {CheckboxRounded, CheckboxSize} from '../../variants/checkbox';
import {checkboxVariants} from '../../variants/checkbox';
import './Checkbox.css';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'label'>, 'onChange' | 'defaultChecked'> {
  /** Label rendered next to the checkbox. */
  label?: string;
  /** Custom content for the label slot (replaces `label`). */
  labelContent?: ReactNode;
  /** The controlled checked state (`true`, `false` or `"indeterminate"`). */
  checked?: boolean | 'indeterminate';
  /** The initial checked state. */
  defaultChecked?: boolean | 'indeterminate';
  /** Called when the checked state changes. */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  /** The `name` attribute of the hidden input (for forms). */
  name?: string;
  /** The submitted form value when checked. */
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  size?: CheckboxSize;
  rounded?: CheckboxRounded;
  className?: string;
  labelClassName?: string;
}

/**
 * Checkbox built on @zag-js/checkbox with the Nebula LCARS styling
 * (one corner rounded) used across the design system.
 */
export const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    labelContent,
    checked,
    defaultChecked,
    onCheckedChange,
    name,
    value,
    disabled,
    invalid,
    required,
    readOnly,
    size,
    rounded,
    className,
    labelClassName,
  } = props;

  const service = useMachine(checkbox.machine, {
    id: useId(),
    checked,
    defaultChecked,
    name,
    value,
    disabled,
    invalid,
    required,
    readOnly,
    onCheckedChange: (details) => onCheckedChange?.(details.checked),
  });

  const api = checkbox.connect(service, normalizeProps);

  const indeterminate = api.indeterminate;

  return (
    <label
      {...api.getRootProps()}
      className={clsxMerge('nb-checkbox__root', className)}
    >
      <span {...api.getControlProps()} className={clsxMerge(checkboxVariants({size, rounded}))}>
        {api.checked && (
          <span {...api.getIndicatorProps()} className="nb-checkbox__indicator">
            <CheckIcon/>
          </span>
        )}
        {indeterminate && !api.checked && (
          <span {...api.getIndicatorProps()} className="nb-checkbox__indicator">
            <MinusIcon/>
          </span>
        )}
      </span>
      {(label || labelContent) && (
        <span {...api.getLabelProps()} className={clsxMerge('nb-checkbox__label', labelClassName)}>
          {labelContent ?? label}
        </span>
      )}
      <input {...api.getHiddenInputProps()} />
    </label>
  );
};
