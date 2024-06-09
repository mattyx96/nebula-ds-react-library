import {VariantProps} from "class-variance-authority";
import {panelVariants} from "./paper";

export type PaperVariants = VariantProps<typeof panelVariants>;

export const panelRoundVariants = ['lg', 'no', 'xs'] as const satisfies Omit<PaperVariants['round'], 'null' | 'undefined'>;

export const panelOutlineVariants = [
  '700',
  '500',
  '200',
  '50',
] as const satisfies Omit<PaperVariants['outline'], 'null' | 'undefined'>;
