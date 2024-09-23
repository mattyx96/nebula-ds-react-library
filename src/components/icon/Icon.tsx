import {cva, VariantProps} from 'class-variance-authority';
import {clsxMerge} from '../../common/utils/classNameUtils.ts';
import type {ComponentPropsWithRef} from 'react';

type Props = VariantProps<typeof iconStyles> & ComponentPropsWithRef<'div'>;

export const Icon = (props: Props) => {
  return (
    <div className={clsxMerge(iconStyles({size: props.size}), props.className)}>
      {props.children}
    </div>
  );
};

const iconStyles = cva(
  ``,
  {
    variants: {
      size: {
        M: 'w-6 h-6',
        L: 'w-7 h-7',
        S: 'w-5 h-5',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  }
);
