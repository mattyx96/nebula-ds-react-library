import {useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as select from '@zag-js/select';
import {normalizeProps, Portal, useMachine} from '@zag-js/react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import {buttonVariants} from '../../variants';
import {
  selectContentVariants,
  selectVariants,
  type SelectAlign,
  type SelectOutline,
  type SelectRounded,
  type SelectRound,
  type SelectSize,
  type SelectVariant,
} from '../../variants/select';
import './Select.css';

// The select machine tracks focus-visible (reads HTMLElement.prototype.focus),
// which Storybook can break — see restoreNativeFocus.
restoreNativeFocus();

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

type SelectElementProps = Omit<ComponentPropsWithRef<'div'>, 'onSelect'>;

export interface SelectProps extends SelectElementProps {
  /** The options to render. */
  items: SelectItem[];
  /** Label rendered above the trigger. */
  label?: string;
  /** Text shown when no option is selected. */
  placeholder?: string;
  /** The controlled selected values. */
  value?: string[];
  /** The initial selected values. */
  defaultValue?: string[];
  /** Called when the selection changes. */
  onValueChange?: (value: string[]) => void;
  /** Called when an item is selected. */
  onSelect?: (value: string) => void;
  /** Whether multiple options can be selected. */
  multiple?: boolean;
  /** The `name` attribute of the underlying hidden select (for forms). */
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** Whether the popup closes after selecting. */
  closeOnSelect?: boolean;
  /** Whether keyboard navigation loops. */
  loopFocus?: boolean;
  /** Whether a selected item can be clicked again to clear it (single select). */
  deselectable?: boolean;
  /** The controlled open state. */
  open?: boolean;
  /** The initial open state. */
  defaultOpen?: boolean;
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void;
  size?: SelectSize;
  variant?: SelectVariant;
  rounded?: SelectRounded;
  /** Popup panel corner rounding. */
  round?: SelectRound;
  /** Popup panel outline tone. */
  outline?: SelectOutline;
  /** Where the popup is placed relative to the trigger. */
  align?: SelectAlign;
  /** The options used to position the popup. Overrides `align`. */
  positioning?: select.PositioningOptions;
  /** Content rendered in the trigger indicator slot (e.g. a chevron). */
  indicator?: ReactNode;
  contentClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
  labelClassName?: string;
}

const alignToPlacement = (align: SelectAlign): 'bottom' | 'bottom-start' | 'bottom-end' => {
  switch (align) {
    case 'start':
      return 'bottom-start';
    case 'center':
      return 'bottom';
    case 'end':
      return 'bottom-end';
  }
};

export const Select = (props: SelectProps) => {
  const {
    items,
    label,
    placeholder = 'Select option',
    value,
    defaultValue,
    onValueChange,
    onSelect,
    multiple,
    name,
    disabled,
    invalid,
    required,
    readOnly,
    closeOnSelect,
    loopFocus,
    deselectable,
    open,
    defaultOpen,
    onOpenChange,
    size,
    variant,
    rounded,
    round,
    outline,
    align,
    positioning,
    indicator,
    className,
    contentClassName,
    itemClassName,
    triggerClassName,
    labelClassName,
    ...rest
  } = props;

  const collection = select.collection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
    isItemDisabled: (item) => item.disabled === true,
  });

  const service = useMachine(select.machine, {
    id: useId(),
    collection,
    value,
    defaultValue,
    multiple,
    name,
    disabled,
    invalid,
    required,
    readOnly,
    closeOnSelect,
    loopFocus,
    deselectable,
    open,
    defaultOpen,
    positioning: {placement: alignToPlacement(align ?? 'start'), ...positioning},
    onValueChange: (details) => onValueChange?.(details.value),
    onSelect: (details) => onSelect?.(details.value),
    onOpenChange: (details) => onOpenChange?.(details.open),
  });

  const api = select.connect(service, normalizeProps);

  return (
    <div className={clsxMerge('nb-select', selectVariants({size, align}), className)} {...rest}>
      <div {...api.getControlProps()} className="nb-select__control">
        {Boolean(label) && (
          <label {...api.getLabelProps()} className={clsxMerge('nb-select__label', labelClassName)}>
            {label}
          </label>
        )}
        <button
          {...api.getTriggerProps()}
          className={clsxMerge(
            buttonVariants({size, variant, rounded}),
            'nb-select__trigger',
            triggerClassName
          )}
        >
          <span {...api.getValueTextProps()} className="nb-select__value">
            {api.valueAsString || placeholder}
          </span>
          {Boolean(indicator) && (
            <span {...api.getIndicatorProps()} className="nb-select__indicator">
              {indicator}
            </span>
          )}
        </button>
      </div>
      <select {...api.getHiddenSelectProps()}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <Portal>
        <div {...api.getPositionerProps()} className="nb-select__positioner">
          <ul
            {...api.getContentProps()}
            className={clsxMerge(selectContentVariants({round, outline}), contentClassName)}
          >
            {items.map((item) => {
              const state = api.getItemState({item});
              return (
                <li
                  key={item.value}
                  {...api.getItemProps({item})}
                  className={clsxMerge('nb-select__item', itemClassName)}
                >
                  <span {...api.getItemTextProps({item})}>{item.label}</span>
                  {state.selected && (
                    <span {...api.getItemIndicatorProps({item})} className="nb-select__item-indicator">
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Portal>
    </div>
  );
};
