import {cva} from 'class-variance-authority';

export const toastVariants = cva(
  'nb-toast',
  {
    variants: {
      type: {
        info: 'nb-toast--type-info',
        success: 'nb-toast--type-success',
        error: 'nb-toast--type-error',
        warning: 'nb-toast--type-warning',
        loading: 'nb-toast--type-loading',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  },
);

export const toastGroupVariants = cva(
  'nb-toast__group',
  {
    variants: {
      placement: {
        'top-start': 'nb-toast__group--top-start',
        top: 'nb-toast__group--top',
        'top-end': 'nb-toast__group--top-end',
        'bottom-start': 'nb-toast__group--bottom-start',
        bottom: 'nb-toast__group--bottom',
        'bottom-end': 'nb-toast__group--bottom-end',
      },
    },
    defaultVariants: {
      placement: 'bottom-end',
    },
  },
);