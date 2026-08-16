import {useEffect, useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as menu from '@zag-js/menu';
import {normalizeProps, useMachine} from '@zag-js/react';
import type {PositioningOptions} from '@zag-js/menu';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import type {MenuItem} from '../../common/types';
import {Icon} from '../icon/Icon.tsx';
import {buttonVariants} from '../../variants';
import {
  menuContentVariants,
  menuVariants,
  type MenuAlign,
  type MenuOutline,
  type MenuRounded,
  type MenuRound,
  type MenuSize,
  type MenuVariant,
  type MenuVariants,
} from '../../variants/menu';
import './Menu.css';

// Zag's focus-visible tracking reads `HTMLElement.prototype.focus`, which
// Storybook's instrumenter turns into an accessor (throws "Illegal invocation").
// Normalize it before the machine's effects run.
restoreNativeFocus();

type MenuElementProps = Omit<ComponentPropsWithRef<'div'>, 'onSelect'>;

interface MenuPropsBase
  extends MenuElementProps,
    MenuVariants {
}

export interface MenuDropdownProps extends MenuPropsBase {
  /** The menu items to render. */
  items: MenuItem[];
  /** Custom trigger content (replaces `text`). */
  trigger?: ReactNode;
  /** The trigger button label. */
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Content rendered in the trigger indicator slot (e.g. a chevron). */
  indicator?: ReactNode;
  size?: MenuSize;
  variant?: MenuVariant;
  rounded?: MenuRounded;
  round?: MenuRound;
  outline?: MenuOutline;
  /** Where the dropdown is placed relative to the trigger. */
  align?: MenuAlign;
  /** The options used to dynamically position the menu. Overrides `align`. */
  positioning?: PositioningOptions;
  /** Called when a menu item is selected. */
  onSelect?: (value: string) => void;
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** The controlled open state of the menu. */
  open?: boolean;
  /** The initial open state of the menu. */
  defaultOpen?: boolean;
  /** Whether to close the menu when an option is selected. */
  closeOnSelect?: boolean;
  /** Whether pressing printable characters triggers typeahead navigation. */
  typeahead?: boolean;
  /** Whether to loop the keyboard navigation. */
  loopFocus?: boolean;
  /** The initial highlighted value of the menu item. */
  defaultHighlightedValue?: string | null;
  /** The accessibility label for the menu. */
  ariaLabel?: string;
  contentClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
}

const alignToPlacement = (align: MenuAlign): 'bottom' | 'bottom-start' | 'bottom-end' => {
  switch (align) {
    case 'start':
      return 'bottom-start';
    case 'center':
      return 'bottom';
    case 'end':
      return 'bottom-end';
  }
};

type MenuRowProps = {
  item: MenuItem;
  api: ReturnType<typeof menu.connect>;
  className?: string;
};

const MenuRow = (props: MenuRowProps) => {
  const {item, api, className} = props;

  const itemProps = api.getItemProps({
    value: item.value,
    disabled: item.disabled,
    closeOnSelect: item.closeOnSelect,
    valueText: item.text ?? item.value,
  });

  useEffect(() => {
    if (!item.onSelect) return;
    return api.addItemListener({
      id: itemProps.id,
      onSelect: () => item.onSelect?.(item.value),
    });
  }, [api, item.onSelect, item.value, itemProps.id]);

  if (item.separator) {
    return (
      <li {...api.getSeparatorProps()} className={clsxMerge('nb-menu__separator', className)} />
    );
  }

  return (
    <li
      {...itemProps}
      className={clsxMerge('nb-menu__item', className)}
    >
      {Boolean(item.leftIcon) && (
        <span className="nb-menu__item-icon">{item.leftIcon}</span>
      )}
      {Boolean(item.text) && item.text}
      {Boolean(item.label) && item.label}
      {Boolean(item.rightIcon) && (
        <span className="nb-menu__item-icon nb-menu__item-icon--end">{item.rightIcon}</span>
      )}
    </li>
  );
};

/** Dropdown presentation of the menu (desktop/touch-anchored). */
export const MenuDropdown = (props: MenuDropdownProps) => {
  const {
    items,
    trigger,
    text,
    leftIcon,
    rightIcon,
    indicator,
    size,
    variant,
    rounded,
    round,
    outline,
    align,
    positioning,
    onSelect,
    onOpenChange,
    open,
    defaultOpen,
    closeOnSelect,
    typeahead,
    loopFocus,
    defaultHighlightedValue,
    ariaLabel,
    className,
    contentClassName,
    itemClassName,
    triggerClassName,
    ...rest
  } = props;

  // Storybook can redefine `HTMLElement.prototype.focus` as a throwing accessor
  // after module load; normalize it before the machine's effects read it.
  restoreNativeFocus();

  const service = useMachine(menu.machine, {
    id: useId(),
    open,
    defaultOpen,
    closeOnSelect,
    typeahead,
    loopFocus,
    defaultHighlightedValue,
    'aria-label': ariaLabel,
    positioning: {placement: alignToPlacement(align ?? 'start'), ...positioning},
    onOpenChange: (details) => onOpenChange?.(details.open),
    onSelect: (details) => onSelect?.(details.value),
  });

  const api = menu.connect(service, normalizeProps);

  const triggerProps = api.getTriggerProps();

  return (
    <div className={clsxMerge('nb-menu', menuVariants({size}), className)} {...rest}>
      <button
        {...triggerProps}
        className={clsxMerge(
          buttonVariants({size, variant, rounded}),
          'nb-menu__trigger',
          triggerClassName
        )}
      >
        {Boolean(leftIcon) && <Icon size={size}>{leftIcon}</Icon>}
        {Boolean(text) && text}
        {Boolean(trigger) && trigger}
        {Boolean(indicator) && (
          <span {...api.getIndicatorProps()} className="nb-menu__indicator">
            {indicator}
          </span>
        )}
        {Boolean(rightIcon) && <Icon size={size}>{rightIcon}</Icon>}
      </button>
      <div {...api.getPositionerProps()} className="nb-menu__positioner">
        <ul
          {...api.getContentProps()}
          className={clsxMerge(menuContentVariants({round, outline}), contentClassName)}
        >
          {items.map((item) => (
            <MenuRow
              key={item.value}
              item={item}
              api={api}
              className={itemClassName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
