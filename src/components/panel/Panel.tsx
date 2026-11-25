import React, {type ComponentPropsWithRef} from 'react';
import {type VariantProps} from 'class-variance-authority';
import {clsxMerge} from '../../common/utils/classNameUtils';
import './Panel.css'
import {panelVariants} from '../../variants/panel/paper';

type DivElementProps = ComponentPropsWithRef<'div'>;

interface PanelPropsBase
  extends DivElementProps,
    VariantProps<typeof panelVariants> {
}

export interface PanelProps extends PanelPropsBase {
  /** Title block rendered above the panel body (use `<Text variant="header6">`). */
  renderTitle?: React.ReactNode
  /** Action block rendered below `children`, inside the panel. */
  renderActions?: React.ReactNode
  /** Extra classes for the inner panel surface (the outer wrapper takes `className`). */
  panelClassName?: string
}

/**
 * The Nebula card: an optional title above, body content, optional actions
 * below. `outline` sets border strength (`50|200|500|700`), `round` sets the
 * bottom-left corner (`no|xs|lg`).
 *
 * The inner surface swallows click events (`stopPropagation`) so a panel
 * inside a clickable container behaves as one unit; pass `onClick` for the
 * panel's own action.
 */
export const Panel = (props: PanelProps) => {
  const {
    children,
    renderActions,
    renderTitle,
    panelClassName,
    className,
    ...rest
  } = props;

  return (
    <div className={clsxMerge('nb-panel', className)}>
      {Boolean(renderTitle) && (
        <div className="nb-panel__title">
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

/** @deprecated Use `Panel` — the historical name kept as an alias until 1.0. */
export const Paper = Panel;

/** @deprecated Use `PanelProps`. */
export type PaperProps = PanelProps;
