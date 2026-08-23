import {VariantProps} from 'class-variance-authority';
import {toastGroupVariants, toastVariants} from './toastVariants.ts';

export type ToastVariants = VariantProps<typeof toastVariants>;
export type ToastGroupVariants = VariantProps<typeof toastGroupVariants>;

export type ToastType = NonNullable<ToastVariants['type']>;
export type ToastPlacement = NonNullable<ToastGroupVariants['placement']>;

export const toastTypeVariants = ['info', 'success', 'error', 'warning', 'loading'] as const;
export const toastPlacementVariants = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const satisfies Omit<ToastGroupVariants['placement'], 'null' | 'undefined'>;

export {toastGroupVariants, toastVariants};