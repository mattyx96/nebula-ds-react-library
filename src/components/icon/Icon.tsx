import {cva, VariantProps} from 'class-variance-authority';
import {clsxMerge} from '../../common/utils/classNameUtils.ts';
import type {ComponentPropsWithRef} from 'react';

import './Icon.css';

type Props = VariantProps<typeof iconStyles> & ComponentPropsWithRef<'div'>;

export const Icon = (props: Props) => {
  return (
    <div className={clsxMerge(iconStyles({size: props.size}), props.className)}>
      {props.children}
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
