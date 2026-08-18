import {useId, type ComponentPropsWithRef, type ReactNode} from 'react';
import * as dialog from '@zag-js/dialog';
import {normalizeProps, Portal, useMachine} from '@zag-js/react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import {Icon} from '../icon/Icon.tsx';
import {buttonVariants} from '../../variants';
import {
  type MenuRounded,
  type MenuSize,
  type MenuVariant,
} from '../../variants/menu';
import './Dialog.css';

// Defensive: keep `HTMLElement.prototype.focus` readable in Storybook (see Menu).
restoreNativeFocus();

export interface DialogProps extends ComponentPropsWithRef<'div'> {
  /** Custom trigger content (replaces `text`). */
  trigger?: ReactNode;
  /** The trigger button label. */
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** The dialog title (labelled by the dialog). */
  title?: string;
  /** Optional description rendered under the title. */
  description?: string;
  /** Content rendered inside the dialog body. */
  children?: ReactNode;
  size?: MenuSize;
  variant?: MenuVariant;
  rounded?: MenuRounded;
  /** The controlled open state of the dialog. */
  open?: boolean;
  /** The initial open state of the dialog. */
  defaultOpen?: boolean;
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog is modal (blocks interaction behind it). */
  modal?: boolean;
  /** Whether pressing Escape closes the dialog. */
  closeOnEscape?: boolean;
  /** Whether clicking outside closes the dialog. */
  closeOnInteractOutside?: boolean;
  /** The dialog role. Use `alertdialog` for urgent actions. */
  role?: 'dialog' | 'alertdialog';
  triggerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export const Dialog = (props: DialogProps) => {
  const {
    trigger,
    text,
    leftIcon,
    rightIcon,
    title,
    description,
    children,
    size,
    variant,
    rounded,
    open,
    defaultOpen,
    onOpenChange,
    modal = true,
    closeOnEscape = true,
    closeOnInteractOutside = true,
    role,
    className,
    triggerClassName,
    contentClassName,
    titleClassName,
    ...rest
  } = props;

  const service = useMachine(dialog.machine, {
    id: useId(),
    open,
    defaultOpen,
    modal,
    closeOnEscape,
    closeOnInteractOutside,
    role,
    onOpenChange: (details) => onOpenChange?.(details.open),
  });

  const api = dialog.connect(service, normalizeProps);

  return (
    <div className={clsxMerge('nb-dialog', className)} {...rest}>
      <button
        {...api.getTriggerProps()}
        className={clsxMerge(
          buttonVariants({size, variant, rounded}),
          'nb-dialog__trigger',
          triggerClassName
        )}
      >
        {Boolean(leftIcon) && <Icon size={size}>{leftIcon}</Icon>}
        {Boolean(text) && text}
        {Boolean(trigger) && trigger}
        {Boolean(rightIcon) && <Icon size={size}>{rightIcon}</Icon>}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getBackdropProps()} className="nb-dialog__backdrop"/>
          <div {...api.getPositionerProps()} className="nb-dialog__positioner">
            <div
              {...api.getContentProps()}
              className={clsxMerge('nb-dialog__content', contentClassName)}
            >
              <div className="nb-dialog__header">
                {Boolean(title) && (
                  <h2 {...api.getTitleProps()} className={clsxMerge('nb-dialog__title', titleClassName)}>
                    {title}
                  </h2>
                )}
                <button {...api.getCloseTriggerProps()} className="nb-dialog__close" aria-label="Close">
                  ×
                </button>
              </div>
              {Boolean(description) && (
                <p {...api.getDescriptionProps()} className="nb-dialog__description">
                  {description}
                </p>
              )}
              <div className="nb-dialog__body">{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
