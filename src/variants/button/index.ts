import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './buttonVariants.ts';
import { iconButtonVariantsExtendsButton } from './iconButtonVariants.ts';

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type IconButtonVariants = VariantProps<
  typeof iconButtonVariantsExtendsButton
>;

export { buttonVariants, iconButtonVariantsExtendsButton };

export const buttonVariantVariants = [
  'filled',
  'outlined',
  'standard',
  'text',
] as const satisfies Omit<
  VariantProps<typeof buttonVariants>['variant'],
  'null' | 'undefined'
>;

export const buttonSizeVariants = ['L', 'M', 'S'] as const satisfies Omit<
  VariantProps<typeof buttonVariants>['size'],
  'null' | 'undefined'
>;

export const buttonRoundedVariants = [
  'Default',
  'R',
  'RTop',
  'RBottom',
  'L',
  'LTop',
  'LBottom',
] as const satisfies Omit<
  VariantProps<typeof buttonVariants>['rounded'],
  'null' | 'undefined'
>;
