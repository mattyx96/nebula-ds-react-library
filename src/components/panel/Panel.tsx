import React, {type ComponentPropsWithRef} from 'react';
import {type VariantProps} from 'class-variance-authority';
import {clsxMerge} from '../../common/utils/classNameUtils';
import '../../variants/panel/panel.css'
import {panelVariants} from '../../variants/panel/paper';

type DivElementProps = ComponentPropsWithRef<'div'>;

interface PaperPropsBase
  extends DivElementProps,
    VariantProps<typeof panelVariants> {
}

export interface PaperProps extends PaperPropsBase {
  renderTitle?: React.ReactNode
  renderActions?: React.ReactNode
}

//todo: rename to Panel
export const Paper = (props: PaperProps) => {
  const {children, renderActions, renderTitle, className, ...rest} = props;
  return (
    <div
      className={clsxMerge(
        panelVariants({
          round: props.round,
          outline: props.outline,
        }),
        className
      )}
      onClick={(event) => {
        event.stopPropagation()
        props.onClick?.(event)
      }}
      {...rest}
    >
      <div
        className="absolute left-0 top-0 translate-y-full-plus-var-spacing">{Boolean(renderTitle) && renderTitle}</div>
      {Boolean(children) && children}
      {Boolean(renderActions) && renderActions}
    </div>
  );
}
