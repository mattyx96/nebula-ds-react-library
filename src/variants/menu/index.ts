import {VariantProps} from 'class-variance-authority';
import {menuContentVariants, menuVariants} from './menuVariants.ts';
import {
  ButtonVariants,
  buttonRoundedVariants,
  buttonSizeVariants,
  buttonVariantVariants,
} from '../button';

export type MenuVariants = VariantProps<typeof menuVariants>;
export type MenuContentVariants = VariantProps<typeof menuContentVariants>;

export type MenuSize = NonNullable<MenuVariants['size']>;
export type MenuAlign = 'start' | 'center' | 'end';
export type MenuRound = NonNullable<MenuContentVariants['round']>;
export type MenuOutline = NonNullable<MenuContentVariants['outline']>;
export type MenuVariant = NonNullable<ButtonVariants['variant']>;
export type MenuRounded = NonNullable<ButtonVariants['rounded']>;

export const menuSizeVariants = buttonSizeVariants;
export const menuVariantVariants = buttonVariantVariants;
export const menuRoundedVariants = buttonRoundedVariants;

export const menuRoundVariants = [
  'lg',
  'no',
  'xs',
] as const satisfies Omit<MenuContentVariants['round'], 'null' | 'undefined'>;

export const menuOutlineVariants = [
  '700',
  '500',
  '200',
  '50',
] as const satisfies Omit<MenuContentVariants['outline'], 'null' | 'undefined'>;

export const menuAlignVariants = ['start', 'center', 'end'] as const;

export {menuContentVariants, menuVariants};
