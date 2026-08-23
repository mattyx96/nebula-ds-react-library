import {createContext, useContext} from 'react';
import * as toast from '@zag-js/toast';

export const ToastContext = createContext<toast.Store | null>(null);

/** Create a standalone toast store that can be fired from anywhere. */
export const createToastStore = toast.createStore;

/**
 * Access the toast store to fire toasts.
 *
 * Two usage modes:
 * - **Provider mode**: call `useToast()` inside a `<ToastProvider>` — the
 *   store comes from context.
 * - **Standalone mode**: pass the store you created with `createToastStore()`
 *   (or `toast.createStore()`) so no provider is needed:
 *   `const toast = useToast(store)`.
 *
 * Returns a store with `create`, `success`, `error`, `info`, `warning`,
 * `loading`, `dismiss`, `remove`, `pause`, `resume` and `update`.
 */
export const useToast = (store?: toast.Store): toast.Store => {
  if (store) return store;
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider> or passed a store');
  }
  return ctx;
};