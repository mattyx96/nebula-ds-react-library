import {useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as radio from '@zag-js/radio-group';
import {normalizeProps, useMachine} from '@zag-js/react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import type {
  RadioOrientation,
  RadioRounded,
  RadioSize,
} from '../../variants/radioGroup';
import {radioGroupVariants, radioItemVariants} from '../../variants/radioGroup';
import './RadioGroup.css';

// The radio-group machine tracks focus-visible (reads HTMLElement.prototype.focus),
// which Storybook can break — see restoreNativeFocus.
restoreNativeFocus();

export interface RadioItem {
  /** The id/value of the radio option. */
  value: string;
  /** Label rendered next to the option. */
  label: string;
  /** Custom content for the label slot (replaces `label`). */
  labelContent?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue'> {
  /** The options to render. */
  items: RadioItem[];
  /** Group label rendered above the items. */
  label?: string;
  /** The controlled value of the group. */
  value?: string | null;
  /** The initial value of the group. */
  defaultValue?: string | null;
  /** Called when the selected value changes. */
  onValueChange?: (value: string | null) => void;
  /** The `name` attribute of the hidden inputs (for forms). */
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** Layout of the items: horizontal or vertical. */
  orientation?: RadioOrientation;
  size?: RadioSize;
  rounded?: RadioRounded;
  className?: string;
  labelClassName?: string;
}

/**
 * Radio group built on @zag-js/radio-group with Nebula LCARS styling.
 */
export const RadioGroup = (props: RadioGroupProps) => {
  const {
    items,
    label,
    value,
    defaultValue,
    onValueChange,
    name,
    disabled,
    invalid,
    required,
    readOnly,
    orientation,
    size,
    rounded,
    className,
    labelClassName,
  } = props;

  const service = useMachine(radio.machine, {
    id: useId(),
    value,
    defaultValue,
    name,
    disabled,
    invalid,
    required,
    readOnly,
    orientation: orientation ?? 'vertical',
    onValueChange: (details) => onValueChange?.(details.value),
  });

  const api = radio.connect(service, normalizeProps);

  return (
    <div
      {...api.getRootProps()}
      className={clsxMerge(radioGroupVariants({orientation}), className)}
    >
      {Boolean(label) && (
        <span {...api.getLabelProps()} className={clsxMerge('nb-radio-group__label', labelClassName)}>
          {label}
        </span>
      )}
      <div className="nb-radio-group__items">
        {items.map((item) => {
          const state = api.getItemState({value: item.value});
          return (
            <label
              key={item.value}
              {...api.getItemProps({value: item.value})}
              className="nb-radio__item"
            >
              <span
                {...api.getItemControlProps({value: item.value})}
                className={clsxMerge('nb-radio__control', radioItemVariants({size, rounded}))}
              >
                {state.checked && <span className="nb-radio__dot"/>}
              </span>
              {(item.label || item.labelContent) && (
                <span {...api.getItemTextProps({value: item.value})} className="nb-radio__label">
                  {item.labelContent ?? item.label}
                </span>
              )}
              <input {...api.getItemHiddenInputProps({value: item.value})} />
            </label>
          );
        })}
      </div>
    </div>
  );
};
