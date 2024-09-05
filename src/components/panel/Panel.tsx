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
  panelClassName?: string
}

//todo: rename to Panel
export const Paper = (props: PaperProps) => {
  const {
    children,
    renderActions,
    renderTitle,
    panelClassName,
    className,
    ...rest
  } = props;

  return (
    <div className={clsxMerge([], className)}>
      {Boolean(renderTitle) && (
        <div className="pb-4">
          {renderTitle}
        </div>
      )}
      <div
        className={clsxMerge(
          panelVariants({
            round: props.round,
            outline: props.outline,
          }),
          panelClassName
        )}
        onClick={(event) => {
          event.stopPropagation()
          props.onClick?.(event)
        }}
        {...rest}
      >
        {Boolean(children) && children}
        {Boolean(renderActions) && renderActions}
      </div>
    </div>
  );
}
