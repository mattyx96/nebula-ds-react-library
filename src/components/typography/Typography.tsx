import {type ComponentPropsWithRef, createElement, ReactNode} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {TypographyVariants} from "../../variants/typography";
import {typographyVariants} from "../../variants/typography/typographyVariants";

import './Typography.css'

export type Tags = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';

type TypographyElementProps<T extends Tags> = ComponentPropsWithRef<T>;

type TypographyPropsBase<T extends Tags> = TypographyElementProps<T> & TypographyVariants;

export type TypographyWithTextProps<T extends Tags> = TypographyPropsBase<T> & {
  /** Plain string content — shorthand for `children`. `children` wins if both are passed. */
  text?: string;
  /** HTML tag to render (`p` by default). Independent of `variant`. */
  component?: T;
  children?: ReactNode;
  className?: string;
};

export type TypographyProps<T extends Tags> = TypographyWithTextProps<T>;

/**
 * Nebula typography. `variant` picks the type role; `component` picks the
 * HTML tag — they are independent, so semantic headings and visual size can
 * be matched freely.
 *
 * Orbitron roles (display, headers, buttons, captions): `display1`, `display2`,
 * `header1`–`header6`, `button`, `caption`. Roboto Mono body roles (all
 * sentences and copy): `body1`–`body5`. Never set fonts by hand — if a role
 * is missing, extend the variants, don't style around this component.
 */
export const Text = <T extends Tags = 'p'>(props: TypographyProps<T>) => {
  const {text, component, className, children, ...rest} = props;

  return createElement(component || 'p', {
    ...{
      className: clsxMerge(
        typographyVariants({
          variant: props.variant,
        }),
        className
      )
    }, ...rest
  }, children || text);
}
