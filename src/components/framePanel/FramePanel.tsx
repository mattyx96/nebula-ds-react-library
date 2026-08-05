import {ReactNode} from "react";
import {FrameConnector} from "../frameConnector/FrameConnector";
import {Text} from "../typography/Typography";
import {useBreakpoint} from "../../hook/useBreakpoint.ts";
import {clsxMerge} from "../../common/utils/classNameUtils";
import './FramePanel.css'

type Props = ({ title: string; renderTitle?: undefined } | { renderTitle: ReactNode; title?: undefined }) & {
  className?: string
  headerClassName?: string
  footerClassName?: string
  verticalFrameConnectorContainerClassName?: string
  bodyContainerClassName?: string
  sideClassName?: string
  children: ReactNode
  renderSideHeader?: ReactNode
  renderHeader?: ReactNode
  renderFooter?: ReactNode
  renderSide?: ReactNode
  inverse?: boolean
}

export const FramePanel = (props: Props) => {
  const breakpoint = useBreakpoint();
  const frameConnectorSize = breakpoint.isDesktop ? 'M' : 'S';

  return (
    <div
      className={clsxMerge(
        'nb-frame-panel',
        props.inverse && 'nb-frame-panel--inverse',
        props.className
      )}
      data-inverse={props.inverse ? 'true' : undefined}
    >
      {/* header */}
      <header className={clsxMerge('nb-frame-panel__header', props.headerClassName)}>
        {props.renderSideHeader && (
          <div className="nb-frame-panel__side-header">{props.renderSideHeader}</div>
        )}

        <div className="nb-frame-panel__title">
          {props.renderTitle
            ? props.renderTitle
            : <Text component="h1" variant="header1"
                    className="nb-frame-panel__title-text">{props.title}</Text>
          }
        </div>

        <div className="nb-frame-panel__header-connector">
          <FrameConnector
            size={frameConnectorSize}
            className="nb-frame-panel__header-connector-inner"
            firstNode={{className: 'nb-frame-panel__header-node-first'}}
            secondNode={{className: 'nb-frame-panel__header-node-second'}}
          />
        </div>

        {props.renderHeader && (
          <div className="nb-frame-panel__header-actions">{props.renderHeader}</div>
        )}
      </header>
      {/* end header */}

      {/* body */}
      <div className={clsxMerge('nb-frame-panel__body', props.verticalFrameConnectorContainerClassName, props.bodyContainerClassName)}>
        <div className={clsxMerge('nb-frame-panel__side', props.sideClassName)}>
          {props.renderSide && (
            <div className="nb-frame-panel__side-actions">{props.renderSide}</div>
          )}
          <div className="nb-frame-panel__side-connector">
            <FrameConnector
              size={frameConnectorSize}
              vertical
              className="nb-frame-panel__side-connector-inner"
              firstNode={{className: 'nb-frame-panel__side-node'}}
              secondNode={{hidden: true}}
            />
          </div>
        </div>

        <div className="nb-frame-panel__main">
          {props.children}
        </div>
      </div>
      {/* end body */}

      {/* footer */}
      <footer className={clsxMerge('nb-frame-panel__footer', props.footerClassName)}>
        <div className="nb-frame-panel__footer-connector">
          <FrameConnector
            size={frameConnectorSize}
            vertical
            className="nb-frame-panel__footer-vertical"
            firstNode={{hidden: true}}
            bridge={{className: 'nb-frame-panel__bridge-hidden'}}
          />
          <FrameConnector
            size={frameConnectorSize}
            className="nb-frame-panel__footer-horizontal"
            firstNode={{hidden: true}}
            secondNode={{hidden: !props.renderFooter, className: 'nb-frame-panel__footer-node'}}
          />
        </div>
        {props.renderFooter && (
          <div className="nb-frame-panel__footer-actions">{props.renderFooter}</div>
        )}
      </footer>
      {/* end footer */}
    </div>
  )
}
