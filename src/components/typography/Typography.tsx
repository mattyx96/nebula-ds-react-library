import {type ComponentPropsWithRef, createElement, ReactNode} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {TypographyVariants} from "../../variants/typography";
import {typographyVariants} from "../../variants/typography/typographyVariants";

import '../../variants/typography/index.css'

export type Tags = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';

type TypographyElementProps<T extends Tags> = ComponentPropsWithRef<T>;

type TypographyPropsBase<T extends Tags> = TypographyElementProps<T> & TypographyVariants;

export type TypographyWithTextProps<T extends Tags> = TypographyPropsBase<T> & {
  text?: string;
  component?: T;
  children?: ReactNode;
  className?: string;
};

export type TypographyProps<T extends Tags> = TypographyWithTextProps<T>;

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

