import {type ComponentPropsWithRef, type ReactNode} from 'react';
import type {PositioningOptions} from '@zag-js/menu';
import {useBreakpoint} from '../../hook/useBreakpoint';
import type {MenuItem} from '../../common/types';
import {Sheet} from '../sheet/Sheet.tsx';
import {MenuDropdown} from './MenuDropdown.tsx';
import {
  type MenuAlign,
  type MenuOutline,
  type MenuRounded,
  type MenuRound,
  type MenuSize,
  type MenuVariant,
} from '../../variants/menu';

export type {MenuItem} from '../../common/types';
export {MenuDropdown, type MenuDropdownProps} from './MenuDropdown.tsx';

export type MenuMode = 'auto' | 'menu' | 'sheet';
export type MenuBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINT_ORDER: readonly MenuBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

type MenuElementProps = Omit<ComponentPropsWithRef<'div'>, 'onSelect'>;

export interface MenuProps extends MenuElementProps {
  /** The items to render in the dropdown or the bottom sheet. */
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
  /** Dropdown panel corner rounding (desktop only). */
  round?: MenuRound;
  /** Dropdown panel outline tone (desktop only). */
  outline?: MenuOutline;
  /** Where the dropdown is placed relative to the trigger (desktop only). */
  align?: MenuAlign;
  /** The options used to dynamically position the dropdown. Overrides `align`. */
  positioning?: PositioningOptions;
  /** Called when an item is selected. */
  onSelect?: (value: string) => void;
  /** Called when the menu/sheet opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** The controlled open state of the menu/sheet. */
  open?: boolean;
  /** The initial open state of the menu/sheet. */
  defaultOpen?: boolean;
  /** Whether to close the menu/sheet when an option is selected. */
  closeOnSelect?: boolean;
  /** Whether pressing printable characters triggers typeahead navigation (desktop only). */
  typeahead?: boolean;
  /** Whether to loop the keyboard navigation (desktop only). */
  loopFocus?: boolean;
  /** The initial highlighted value of the menu item (desktop only). */
  defaultHighlightedValue?: string | null;
  /** The accessibility label for the dropdown (desktop only). */
  ariaLabel?: string;
  /** Sheet header title (bottom sheet only). */
  title?: string;
  /** Optional description under the title (bottom sheet only). */
  description?: string;
  /**
   * Which presentation to use.
   * - `auto`: dropdown on desktop, bottom sheet below `breakpoint` (default)
   * - `menu`: always the dropdown
   * - `sheet`: always the bottom sheet
   */
  mode?: MenuMode;
  /** The breakpoint at which the menu switches to the bottom sheet (used when `mode="auto"`). */
  breakpoint?: MenuBreakpoint;
  contentClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
}

export const Menu = (props: MenuProps) => {
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
    title,
    description,
    mode = 'auto',
    breakpoint = 'lg',
    className,
    contentClassName,
    itemClassName,
    triggerClassName,
    ...rest
  } = props;

  const {current} = useBreakpoint();

  const showSheet =
    mode === 'sheet' ||
    (mode === 'auto' &&
      BREAKPOINT_ORDER.indexOf(current as MenuBreakpoint) <
        BREAKPOINT_ORDER.indexOf(breakpoint));

  const commonProps = {
    items,
    trigger,
    text,
    leftIcon,
    rightIcon,
    indicator,
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
  };

  if (showSheet) {
    return (
      <Sheet
        {...commonProps}
        title={title}
        description={description}
        {...rest}
      />
    );
  }

  return (
    <MenuDropdown
      {...commonProps}
      round={round}
      outline={outline}
      align={align}
      positioning={positioning}
      typeahead={typeahead}
      loopFocus={loopFocus}
      defaultHighlightedValue={defaultHighlightedValue}
      ariaLabel={ariaLabel}
      {...rest}
    />
  );
};
