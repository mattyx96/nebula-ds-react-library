import {ReactNode} from "react";
import {FrameConnector, FrameConnectorNode} from "../frameConnector/FrameConnector";
import {Text} from "../typography/Typography";
import {useBreakpoint} from "../../hook/useBreakpoint.ts";
import useElementDimensions from "../../hook/useElementDimentions.ts";
import {lightJsTokens} from "nebula-ds-tokens";
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
  const {dimensions: headerFrameConnectorDimensions, ref: headerFrameConnectorRef} = useElementDimensions();
  const {dimensions: footerFrameConnectorDimensions, ref: footerFrameConnectorRef} = useElementDimensions();
  const {dimensions: sideFrameConnectorDimensions, ref: sideFrameConnectorRef} = useElementDimensions();

  const frameConnectorSize = breakpoint.isDesktop ? 'M' : 'S';
  const isHeaderFrameConnectorOneNodeWidth = () => {
    if (breakpoint.isDesktop) {
      return headerFrameConnectorDimensions.width <= 140
    } else {
      return headerFrameConnectorDimensions.width <= 150
    }
  }

  const isFooterFrameConnectorHiddenNode = () => {
    if (breakpoint.isDesktop) {
      return footerFrameConnectorDimensions.width <= 240
    } else {
      return footerFrameConnectorDimensions.width <= 103
    }
  }

  const isSideFrameConnectorHiddenNode = () => {
    if (breakpoint.isDesktop) {
      return sideFrameConnectorDimensions.height <= 200
    } else {
      return sideFrameConnectorDimensions.height <= 160
    }
  }

  const isHeaderFrameConnectorHidden = () => {
    if (breakpoint.isDesktop) {
      return headerFrameConnectorDimensions.width <= 70
    } else {
      return headerFrameConnectorDimensions.width <= 50
    }
  }

  const manageHeaderFrameConnector = (): { hideFirstNode: boolean; hideSecondNode: boolean } => {
    if (props.renderHeader) {
      if (isHeaderFrameConnectorOneNodeWidth()) {
        return {hideFirstNode: true, hideSecondNode: false}
      } else {
        return {hideFirstNode: false, hideSecondNode: false}
      }
    } else {
      if (isHeaderFrameConnectorOneNodeWidth()) {
        return {hideFirstNode: true, hideSecondNode: true}
      } else {
        return {hideFirstNode: true, hideSecondNode: false}
      }
    }
  }

  const bodySideClass = props.inverse
    ? breakpoint.isMobile ? 'nb-frame-panel__body-inner--pad-right-sm' : 'nb-frame-panel__body-inner--pad-right'
    : breakpoint.isMobile ? 'nb-frame-panel__body-inner--pad-left-sm' : 'nb-frame-panel__body-inner--pad-left'

  return (
    <div className={`nb-frame-panel ${props.className || ''}`}>

      {/* header */}
      <div className={`nb-frame-panel__header ${props.headerClassName || ''}`}>
        {props.inverse && (
          <>
            {props.renderHeader &&
              <div className="nb-frame-panel__header-actions">
                {props.renderHeader}
              </div>
            }
            <div ref={headerFrameConnectorRef} className="nb-frame-panel__header-connector">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: manageHeaderFrameConnector().hideSecondNode}}
                  secondNode={{hidden: manageHeaderFrameConnector().hideFirstNode}}
                />
              }
            </div>
          </>
        )}

        {!props.inverse && props.renderSideHeader && props.renderSideHeader}

        {props.renderTitle
          ? props.renderTitle
          : <Text component="h1" variant="header1"
                  className="nb-frame-panel__title-text">{props.title}</Text>
        }

        {props.inverse && props.renderSideHeader && props.renderSideHeader}

        {!props.inverse && (
          <>
            <div ref={headerFrameConnectorRef} className="nb-frame-panel__header-connector">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: manageHeaderFrameConnector().hideFirstNode}}
                  secondNode={{hidden: manageHeaderFrameConnector().hideSecondNode}}
                />
              }
            </div>
            {props.renderHeader &&
              <div className="nb-frame-panel__header-actions">
                {props.renderHeader}
              </div>
            }
          </>)}
      </div>
      {/* end header */}

      {/* body container */}
      <div className={`nb-frame-panel__body ${props.bodyContainerClassName || ''}`}>

        {/* main vertical container (used for mobile side actions )*/}
        {breakpoint.isMobile &&
          <div className={`nb-frame-panel__mobile-side ${props.inverse ? 'nb-frame-panel__mobile-side--end' : 'nb-frame-panel__mobile-side--start'}`}>

            {props.renderSide &&
              <div className="nb-frame-panel__mobile-side-inner">
                {breakpoint.isMobile && props.renderSide}
              </div>
            }

            {
              breakpoint.isMobile && (
                <>
                  {
                    props.inverse
                      ? <FrameConnectorNode
                        size={frameConnectorSize}
                        className="nb-frame-panel__mobile-node--inverse"
                        fill={lightJsTokens.nbFrameBackgroundPrimary}
                      />
                      : <FrameConnectorNode
                        size={frameConnectorSize}
                        className="nb-frame-panel__mobile-node"
                        fill={lightJsTokens.nbFrameBackgroundPrimary}
                      />
                  }
                </>
              )
            }
          </div>
        }
        {/*end main vertical container (used for mobile side actions )*/}

        {/* level 2 - body here */}
        <div
          className={`nb-frame-panel__level2 ${props.verticalFrameConnectorContainerClassName || ''}`}>
          {/* non-inverse side actions and connector */}
          {!props.inverse &&
            <div className="nb-frame-panel__side-col">
              {!breakpoint.isMobile && props.renderSide}
              <div ref={sideFrameConnectorRef} className="nb-frame-panel__side-connector">
                <FrameConnector
                  size={frameConnectorSize}
                  className="nb-frame-panel__connector-stretch"
                  firstNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                  secondNode={{hidden: true}}
                  vertical
                />
              </div>
            </div>
          }

          {/* body */}
          <div
            className={`nb-frame-panel__body-inner ${bodySideClass} ${props.bodyContainerClassName || ''}`}>
            {props.children}
          </div>
          {/* end body */}

          {/* inverse side actions and connector */}
          {props.inverse &&
            <div ref={sideFrameConnectorRef} className="nb-frame-panel__side-col">
              {!breakpoint.isMobile && props.renderSide}
              <FrameConnector
                size={frameConnectorSize}
                className="nb-frame-panel__connector-stretch nb-frame-panel__connector-inverse"
                secondNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                firstNode={{hidden: true}}
                vertical
              />
            </div>
          }
        </div>
        {/* end level 2 - body here */}

        {/* footer */}
        <div className={`nb-frame-panel__footer ${props.footerClassName || ''}`}>
          {props.inverse && props.renderFooter}
          <div ref={footerFrameConnectorRef} className="nb-frame-panel__footer-connector">
            {!props.inverse && <FrameConnector
              size={frameConnectorSize}
              bridge={{className: 'nb-frame-panel__bridge-hidden'}}
              firstNode={{hidden: true}}
              vertical
            />}
            <FrameConnector
              className="nb-frame-panel__connector-fit"
              size={frameConnectorSize}
              {...(props.inverse
                  ? {
                    secondNode: {hidden: true},
                    firstNode: {hidden: !props.renderFooter || isFooterFrameConnectorHiddenNode()}
                  }
                  : {
                    firstNode: {hidden: true},
                    secondNode: {hidden: !props.renderFooter || isFooterFrameConnectorHiddenNode()}
                  }
              )}
            />
            {props.inverse && <FrameConnector
              size={frameConnectorSize}
              className="nb-frame-panel__connector-flip-x"
              bridge={{className: 'nb-frame-panel__bridge-hidden'}}
              firstNode={{hidden: true}}
              vertical
            />}
          </div>
          {!props.inverse && props.renderFooter}
        </div>
        {/* end footer */}

      </div>
      {/* end body container */}

    </div>
  )
}
