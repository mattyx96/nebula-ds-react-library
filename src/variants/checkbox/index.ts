import {VariantProps} from 'class-variance-authority';
import {checkboxVariants} from './checkboxVariants.ts';
import {buttonRoundedVariants, buttonSizeVariants} from '../button';

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxSize = NonNullable<CheckboxVariants['size']>;
export type CheckboxRounded = NonNullable<CheckboxVariants['rounded']>;

export const checkboxSizeVariants = buttonSizeVariants;
export const checkboxRoundedVariants = buttonRoundedVariants;

export {checkboxVariants};
