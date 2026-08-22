import {
  Portal,
  normalizeProps,
  useMachine,
} from '@zag-js/react';
import * as toast from '@zag-js/toast';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {
  useId,
  useState,
  type ReactNode,
} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {restoreNativeFocus} from '../../common/utils/restoreNativeFocus';
import {useTheme} from '../themeProvider/themeContext.ts';
import type {
  ToastPlacement,
  ToastType,
} from '../../variants/toast';
import {toastGroupVariants, toastVariants} from '../../variants/toast';
import {ToastContext} from './toastContext.ts';
import './Toast.css';

// Defensive: keep `HTMLElement.prototype.focus` readable in Storybook (see Menu).
restoreNativeFocus();

export type {Options as ToastOptions, Store as ToastStore} from '@zag-js/toast';
export type {ToastPlacement} from '../../variants/toast';

/* ------------------------------------------------------------------ */
/* Provider                                                             */
/* ------------------------------------------------------------------ */

export interface ToastProviderProps {
  children?: ReactNode;
  /** Where the toasts appear on screen. @default 'bottom-end' */
  placement?: ToastPlacement;
  /** Maximum number of visible toasts (the rest are queued). @default 24 */
  max?: number;
  /** Whether to overlap sibling toasts (compact) or stack them. @default false */
  overlap?: boolean;
  /** Gap between stacked toasts. @default 16 */
  gap?: number;
  /** Viewport offsets, e.g. '1rem' or `{top, bottom, left, right}`. @default '1rem' */
  offsets?: string | Record<'left' | 'right' | 'bottom' | 'top', string>;
  /** Extra time a dismissing toast stays mounted (exit transition ms). @default 200 */
  removeDelay?: number;
  /** Default visible duration per toast (ms). Overridden by the per-toast `duration`. */
  duration?: number;
  /** Whether to pause the auto-dismiss timer when the page is idle. @default false */
  pauseOnPageIdle?: boolean;
  className?: string;
}

/**
 * Wraps your app and mounts the toast viewport (rendered through a Portal).
 * Exposes the toast store to `useToast()`.
 */
export const ToastProvider = (props: ToastProviderProps) => {
  const {
    children,
    placement = 'bottom-end',
    max,
    overlap,
    gap,
    offsets,
    removeDelay,
    duration,
    pauseOnPageIdle,
    className,
  } = props;

  // The store is created once per provider mount (placement/gap/etc. are
  // provider-level configuration, like most design systems do).
  const [store] = useState(() =>
    toast.createStore({
      placement,
      max,
      overlap,
      gap,
      offsets,
      removeDelay,
      duration,
      pauseOnPageIdle,
    })
  );

  return (
    <ToastContext.Provider value={store}>
      {children}
      <Toaster store={store} placement={placement} className={className} />
    </ToastContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/* Standalone viewport (Toaster)                                        */
/* ------------------------------------------------------------------ */

export interface ToasterProps {
  /** The toast store whose toasts should be rendered.
   *  Create one with `createToastStore()` (e.g. at module scope) and pass it
   *  here, or rely on the store created internally by `<ToastProvider>`. */
  store: toast.Store;
  /** Where the toasts appear on screen. @default 'bottom-end' */
  placement?: ToastPlacement;
  className?: string;
}

/**
 * Standalone toast viewport. Mount it once (rendered through a Portal) and
 * drive it from any store: `createToastStore()` + `store.success({...})`,
 * without needing a `<ToastProvider>` around your app.
 */
export const Toaster = (props: ToasterProps) => {
  const {store, placement, className} = props;

  const {theme} = useTheme();

  const service = useMachine(toast.group.machine, {
    id: useId(),
    store,
  });
  const api = toast.group.connect(service, normalizeProps);

  return (
    <Portal>
      {/*
        The viewport is portaled to <body>, outside the themed wrapper the
        ThemeProvider renders. Carry the active theme on the group root so the
        theme-scoped CSS variables (e.g. --nb-background-secondary-default)
        resolve for the toasts in both light and dark mode.
      */}
      <div
        data-nb-theme={theme}
        {...api.getGroupProps()}
        className={clsxMerge(toastGroupVariants({placement}), className)}
      >
        {api.getToasts().map((item, index) => (
          <ToastItem key={item.id} toast={item} parent={service} index={index} />
        ))}
      </div>
    </Portal>
  );
};

/* ------------------------------------------------------------------ */
/* Single toast item                                                    */
/* ------------------------------------------------------------------ */

const toastTypeIcons: Record<ToastType, ReactNode> = {
  info: <InformationCircleIcon width={20} height={20} />,
  success: <CheckCircleIcon width={20} height={20} />,
  error: <XCircleIcon width={20} height={20} />,
  warning: <ExclamationTriangleIcon width={20} height={20} />,
  loading: <ArrowPathIcon width={20} height={20} />,
};

type ToastItemProps = {
  toast: toast.Props;
  parent: toast.GroupService;
  index: number;
  className?: string;
};

const ToastItem = (props: ToastItemProps) => {
  const {toast: item, parent, index, className} = props;

  const service = useMachine(toast.machine, {
    ...item,
    parent,
    index,
  });
  const api = toast.connect(service, normalizeProps);

  const type = (api.type ?? 'info') as ToastType;

  return (
    <div
      {...api.getRootProps()}
      className={clsxMerge(toastVariants({type}), className)}
    >
      <span className="nb-toast__icon">{toastTypeIcons[type]}</span>

      <div className="nb-toast__body">
        {Boolean(api.title) && (
          <h3 {...api.getTitleProps()} className="nb-toast__title">
            {api.title}
          </h3>
        )}
        {Boolean(api.description) && (
          <p {...api.getDescriptionProps()} className="nb-toast__description">
            {api.description}
          </p>
        )}
        {Boolean(item.action) && (
          <button {...api.getActionTriggerProps()} className="nb-toast__action">
            {item.action?.label}
          </button>
        )}
      </div>

      {api.closable && (
        <button {...api.getCloseTriggerProps()} className="nb-toast__close" aria-label="Dismiss">
          <XMarkIcon width={14} height={14} />
        </button>
      )}
    </div>
  );
};