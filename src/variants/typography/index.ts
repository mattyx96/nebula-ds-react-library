import {VariantProps} from "class-variance-authority";
import {typographyVariants} from "./typographyVariants.ts";
import {Tags} from "../../components/typography/Typography.tsx";

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export const typographyVariantVariants = [
  'display1',
  'display2',
  'header1',
  'header2',
  'header3',
  'header4',
  'header5',
  'header6',
  'body1',
  'body2',
  'body3',
  'body4',
  'body5',
  'button',
  'caption'
] as const satisfies Omit<TypographyVariants['variant'], 'null' | 'undefined'>

export const typographyWeightVariants = [
  'default',
  'light',
  'bold',
  'bolder',
] as const satisfies Omit<TypographyVariants['weight'], 'null' | 'undefined'>

export const typographyComponentVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
] satisfies Tags[]
