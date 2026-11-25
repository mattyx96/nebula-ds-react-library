import {cva, VariantProps} from 'class-variance-authority';
import {clsxMerge} from '../../common/utils/classNameUtils.ts';
import type {ComponentPropsWithRef} from 'react';

import './Icon.css';

type Props = VariantProps<typeof iconStyles> & ComponentPropsWithRef<'div'>;

/**
 * Sizing wrapper for icons (heroicons sized 20/24/28 px by `size`).
 * Pass `aria-hidden="true"` for decorative icons; labelled icons belong in
 * `Button`'s `leftIcon`/`rightIcon` or `IconButton`'s `icon` slots.
 */
export const Icon = (props: Props) => {
  const {size, className, children, ...rest} = props;

  return (
    <div className={clsxMerge(iconStyles({size}), className)} {...rest}>
      {children}
    </div>
  );
};

const iconStyles = cva(
  'nb-icon',
  {
    variants: {
      size: {
        M: 'nb-icon--size-m',
        L: 'nb-icon--size-l',
        S: 'nb-icon--size-s',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  }
);
