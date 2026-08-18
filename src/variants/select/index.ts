import {VariantProps} from 'class-variance-authority';
import {selectContentVariants, selectVariants} from './selectVariants.ts';
import {
  ButtonVariants,
  buttonRoundedVariants,
  buttonSizeVariants,
  buttonVariantVariants,
} from '../button';

export type SelectVariants = VariantProps<typeof selectVariants>;
export type SelectContentVariants = VariantProps<typeof selectContentVariants>;

export type SelectSize = NonNullable<SelectVariants['size']>;
export type SelectAlign = NonNullable<SelectVariants['align']>;
export type SelectRound = NonNullable<SelectContentVariants['round']>;
export type SelectOutline = NonNullable<SelectContentVariants['outline']>;
export type SelectVariant = NonNullable<ButtonVariants['variant']>;
export type SelectRounded = NonNullable<ButtonVariants['rounded']>;

export const selectSizeVariants = buttonSizeVariants;
export const selectVariantVariants = buttonVariantVariants;
export const selectRoundedVariants = buttonRoundedVariants;

export const selectRoundVariants = [
  'lg',
  'no',
  'xs',
] as const satisfies Omit<SelectContentVariants['round'], 'null' | 'undefined'>;

export const selectOutlineVariants = [
  '700',
  '500',
  '200',
  '50',
] as const satisfies Omit<SelectContentVariants['outline'], 'null' | 'undefined'>;

export const selectAlignVariants = ['start', 'center', 'end'] as const;

export {selectContentVariants, selectVariants};
