import {cva} from "class-variance-authority";


export const panelVariants = cva(
  'nb-panel__inner',
  {
    variants: {
      round: {
        no: 'nb-panel--round-no',
        xs: 'nb-panel--round-xs',
        lg: 'nb-panel--round-lg',
      },

      outline: {
        '700': 'nb-panel--outline-700',
        '500': 'nb-panel--outline-500',
        '200': 'nb-panel--outline-200',
        '50': 'nb-panel--outline-50',
      }
    },
    defaultVariants: {
      round: 'no',
      outline: '500',
    },
  },
)
