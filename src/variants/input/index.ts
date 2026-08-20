import {VariantProps} from 'class-variance-authority';
import {inputVariants} from './inputVariants.ts';
import {buttonRoundedVariants, buttonSizeVariants} from '../button';

export type InputVariants = VariantProps<typeof inputVariants>;

export type InputSize = NonNullable<InputVariants['size']>;
export type InputVariant = NonNullable<InputVariants['variant']>;
export type InputRounded = NonNullable<InputVariants['rounded']>;

export const inputSizeVariants = buttonSizeVariants;
export const inputVariantVariants = [
  'outlined',
  'filled',
  'standard',
  'text',
] as const satisfies Omit<InputVariants['variant'], 'null' | 'undefined'>;
export const inputRoundedVariants = buttonRoundedVariants;

export {inputVariants};
