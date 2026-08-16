import type {ReactNode} from 'react';

/** A single entry shared by the Menu dropdown and the Sheet (bottom sheet). */
export interface MenuItem {
  /** The unique value of the menu item option. */
  value: string;
  /** The menu item label (used for typeahead navigation when `text` is not provided). */
  text?: string;
  /** Custom content rendered inside the item (replaces `text`). */
  label?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  /** Render a separator instead of an item. */
  separator?: boolean;
  /** Whether the menu/sheet should be closed when this option is selected. */
  closeOnSelect?: boolean;
  /** Called when the item is selected (click or keyboard). */
  onSelect?: (value: string) => void;
}
