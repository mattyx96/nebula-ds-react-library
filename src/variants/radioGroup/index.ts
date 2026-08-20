import {VariantProps} from 'class-variance-authority';
import {radioGroupVariants, radioItemVariants} from './radioGroupVariants.ts';
import {buttonRoundedVariants, buttonSizeVariants} from '../button';

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
export type RadioItemVariants = VariantProps<typeof radioItemVariants>;

export type RadioSize = NonNullable<RadioItemVariants['size']>;
export type RadioRounded = NonNullable<RadioItemVariants['rounded']>;
export type RadioOrientation = NonNullable<RadioGroupVariants['orientation']>;

export const radioSizeVariants = buttonSizeVariants;
export const radioRoundedVariants = buttonRoundedVariants;
export const radioOrientationVariants = ['horizontal', 'vertical'] as const;

export {radioGroupVariants, radioItemVariants};
