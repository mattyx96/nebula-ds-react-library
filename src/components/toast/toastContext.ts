import {createContext, useContext} from 'react';
import type {Store as ToastStore} from '@zag-js/toast';

export const ToastContext = createContext<ToastStore | null>(null);

/**
 * Access the app-wide toast store (created by `<ToastProvider>`).
 * Call `toast.success({title, description})`, `toast.error(...)`,
 * `toast.info(...)`, `toast.warning(...)`, `toast.loading(...)` or
 * `toast.dismiss(id)` / `toast.remove(id)` to control the toasts.
 */
export const useToast = (): ToastStore => {
  const store = useContext(ToastContext);
  if (!store) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return store;
};