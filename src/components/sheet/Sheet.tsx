import {useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as drawer from '@zag-js/drawer';
import {normalizeProps, Portal, useMachine} from '@zag-js/react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import type {MenuItem} from '../../common/types';
import {Icon} from '../icon/Icon.tsx';
import {buttonVariants} from '../../variants';
import {
  type MenuRounded,
  type MenuSize,
  type MenuVariant,
} from '../../variants/menu';
import './Sheet.css';

// Defensive: keep `HTMLElement.prototype.focus` readable in Storybook (see Menu).
restoreNativeFocus();

type SheetElementProps = Omit<ComponentPropsWithRef<'div'>, 'onSelect'>;

export interface SheetProps extends SheetElementProps {
  /** The items to render inside the bottom sheet. */
  items: MenuItem[];
  /** Custom trigger content (replaces `text`). */
  trigger?: ReactNode;
  /** The trigger button label. */
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Content rendered in the trigger indicator slot (e.g. a chevron). */
  indicator?: ReactNode;
  /** The sheet header title. */
  title?: string;
  /** Optional description rendered under the title. */
  description?: string;
  size?: MenuSize;
  variant?: MenuVariant;
  rounded?: MenuRounded;
  /** Called when an item is selected. */
  onSelect?: (value: string) => void;
  /** Called when the sheet opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** The controlled open state of the sheet. */
  open?: boolean;
  /** The initial open state of the sheet. */
  defaultOpen?: boolean;
  /** Whether to close the sheet when an option is selected. */
  closeOnSelect?: boolean;
  contentClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
}

type SheetRowProps = {
  item: MenuItem;
  className?: string;
  onSelect: (value: string, onItemSelect?: (value: string) => void) => void;
};

const SheetRow = (props: SheetRowProps) => {
  const {item, className, onSelect} = props;

  if (item.separator) {
    return <div role="separator" className={clsxMerge('nb-sheet__separator', className)} />;
  }

  return (
    <button
      type="button"
      disabled={item.disabled}
      className={clsxMerge('nb-sheet__item', className)}
      onClick={() => onSelect(item.value, item.onSelect)}
    >
      {Boolean(item.leftIcon) && (
        <span className="nb-sheet__item-icon">{item.leftIcon}</span>
      )}
      {Boolean(item.text) && item.text}
      {Boolean(item.label) && item.label}
      {Boolean(item.rightIcon) && (
        <span className="nb-sheet__item-icon nb-sheet__item-icon--end">{item.rightIcon}</span>
      )}
    </button>
  );
};

/** Bottom sheet presentation of a menu — ideal for touch/mobile. */
export const Sheet = (props: SheetProps) => {
  const {
    items,
    trigger,
    text,
    leftIcon,
    rightIcon,
    indicator,
    title,
    description,
    size,
    variant,
    rounded,
    onSelect,
    onOpenChange,
    open,
    defaultOpen,
    closeOnSelect,
    className,
    contentClassName,
    itemClassName,
    triggerClassName,
    ...rest
  } = props;

  const service = useMachine(drawer.machine, {
    id: useId(),
    open,
    defaultOpen,
    modal: true,
    preventScroll: true,
    closeOnInteractOutside: true,
    closeOnEscape: true,
    snapPoints: [1],
    swipeDirection: 'down',
    onOpenChange: (details) => onOpenChange?.(details.open),
  });

  const api = drawer.connect(service, normalizeProps);

  const handleSelect = (value: string, onItemSelect?: (value: string) => void) => {
    onItemSelect?.(value);
    onSelect?.(value);
    if (closeOnSelect !== false) api.setOpen(false);
  };

  return (
    <div
      className={clsxMerge(
        'nb-sheet',
        `nb-sheet--size-${(size ?? 'M').toLowerCase()}`,
        className
      )}
      {...rest}
    >
      <button
        {...api.getTriggerProps()}
        className={clsxMerge(
          buttonVariants({size, variant, rounded}),
          'nb-sheet__trigger',
          triggerClassName
        )}
      >
        {Boolean(leftIcon) && <Icon size={size}>{leftIcon}</Icon>}
        {Boolean(text) && text}
        {Boolean(trigger) && trigger}
        {Boolean(indicator) && (
          <span className="nb-sheet__indicator">{indicator}</span>
        )}
        {Boolean(rightIcon) && <Icon size={size}>{rightIcon}</Icon>}
      </button>
      <Portal>
        <div {...api.getPositionerProps()} className="nb-sheet__positioner">
          <div {...api.getBackdropProps()} className="nb-sheet__backdrop" />
          <div
            {...api.getContentProps()}
            className={clsxMerge('nb-sheet__content', contentClassName)}
          >
            <button {...api.getGrabberProps()} className="nb-sheet__grabber">
              <span {...api.getGrabberIndicatorProps()} className="nb-sheet__grabber-indicator" />
            </button>
            {Boolean(title) && (
              <h2 {...api.getTitleProps()} className="nb-sheet__title">
                {title}
              </h2>
            )}
            {Boolean(description) && (
              <p {...api.getDescriptionProps()} className="nb-sheet__description">
                {description}
              </p>
            )}
            <div className="nb-sheet__items">
              {items.map((item) => (
                <SheetRow
                  key={item.value}
                  item={item}
                  className={itemClassName}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};
