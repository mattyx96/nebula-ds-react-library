import {cva} from "class-variance-authority";


export const panelVariants = cva(
  `
    relative flex flex-col gap-5 pl-5 pr-5 pt-5 pb-5 bg-background-primary 
    border-border-1 rounded-tr-border-radius-default rounded-tl-border-radius-default 
    rounded-br-border-radius-default mt-10
  `,
  {
    variants: {
      round: {                   //todo: sync with button variant rounded name
        no: 'rounded-bl-border-radius-default', //todo: add rounded button variant into figma
        xs: 'rounded-bl-paper-border-radius-md',
        lg: 'rounded-bl-paper-border-radius-big',
      },

      outline: {
        '700': 'border-background-contrast-primary-200',
        '500': 'border-background-accent-500',
        '200': 'border-background-accent-200',
        '50': 'border-background-contrast-primary-50 shadow-[0_1px_6px_rgb(0,0,0,0.07)]', //todo: add drop-shadow-sm to tokens
      }
    },
    defaultVariants: {
      round: 'no',
      outline: '500',
    },
  },
)
