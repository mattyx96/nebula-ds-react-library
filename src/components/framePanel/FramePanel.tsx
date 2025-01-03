import {ReactNode} from "react";
import {FrameConnector, FrameConnectorNode} from "../frameConnector/FrameConnector";
import {Text} from "../typography/Typography";
import {useBreakpoint} from "../../hook/useBreakpoint.ts";
import useElementDimensions from "../../hook/useElementDimentions.ts";
import {lightJsTokens} from "nebula-ds-tokens";

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

  return (
    <div className={`w-full flex gap-4 flex-col ${props.className || ''}`}>

      {/* header */}
      <div className={`flex w-full gap-4 justify-between items-center ${props.headerClassName || ''}`}>
        {props.inverse && (
          <>
            {props.renderHeader &&
              <div className="flex gap-4 items-center">
                {props.renderHeader}
              </div>
            }
            <div ref={headerFrameConnectorRef} className="w-full flex flex-1 scale-[-1]">
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
                  className="!text-2xl md:!text-3xl xl:!text-5xl !leading-0">{props.title}</Text>
        }

        {props.inverse && props.renderSideHeader && props.renderSideHeader}

        {!props.inverse && (
          <>
            <div ref={headerFrameConnectorRef} className="w-full flex flex-1 scale-[-1]">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: manageHeaderFrameConnector().hideFirstNode}}
                  secondNode={{hidden: manageHeaderFrameConnector().hideSecondNode}}
                />
              }
            </div>
            {props.renderHeader &&
              <div className="flex gap-4 items-center">
                {props.renderHeader}
              </div>
            }
          </>)}
      </div>
      {/* end header */}

      {/* body container */}
      <div className={`flex flex-1 flex-col ${props.bodyContainerClassName || ''}`}>

        {/* main vertical container (used for mobile side actions )*/}
        {breakpoint.isMobile &&
          <div className={`flex flex-col ${props.inverse ? 'items-end' : 'items-start'}`}>

            {props.renderSide &&
              <div className={`flex flex-1 flex-wrap gap-4 mb-4`}>
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
                        className="!inline !rotate-[270deg] !origin-center !h-[44px]"
                        fill={lightJsTokens.nbFrameBackgroundPrimary}
                      />
                      : <FrameConnectorNode
                        size={frameConnectorSize}
                        className="!inline !w-fit !scale-x-[-1] !rotate-90 !origin-center"
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
          className={`flex h-full flex-grow items-stretch ${props.verticalFrameConnectorContainerClassName || ''}`}>
          {/* non-inverse side actions and connector */}
          {!props.inverse &&
            <div className="flex flex-col justify-items-stretch gap-4">
              {!breakpoint.isMobile && props.renderSide}
              <div ref={sideFrameConnectorRef} className="flex flex-col flex-1">
                <FrameConnector
                  size={frameConnectorSize}
                  className="flex flex-1 items-stretch "
                  firstNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                  secondNode={{hidden: true}}
                  vertical
                />
              </div>
            </div>
          }

          {/* body */}
          <div
            className={`flex flex-1 pb-4 ${props.inverse ? breakpoint.isMobile ? 'pr-2' : 'pr-4' : breakpoint.isMobile ? 'pl-2' : 'pl-4'} ${props.bodyContainerClassName || ''}`}>
            {props.children}
          </div>
          {/* end body */}

          {/* inverse side actions and connector */}
          {props.inverse &&
            <div ref={sideFrameConnectorRef} className="flex flex-col justify-items-stretch gap-4">
              {!breakpoint.isMobile && props.renderSide}
              <FrameConnector
                size={frameConnectorSize}
                className="flex flex-1 items-stretch scale-[-1]"
                secondNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                firstNode={{hidden: true}}
                vertical
              />
            </div>
          }
        </div>
        {/* end level 2 - body here */}

        {/* footer */}
        <div className={`flex items-end gap-4 h-fit ${props.footerClassName || ''}`}>
          {props.inverse && props.renderFooter}
          <div ref={footerFrameConnectorRef} className="w-full flex flex-1 h-full items-end">
            {!props.inverse && <FrameConnector
              size={frameConnectorSize}
              bridge={{className: 'hidden'}}
              firstNode={{hidden: true}}
              vertical
            />}
            <FrameConnector
              className="h-fit"
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
              className="scale-x-[-1]"
              bridge={{className: 'hidden'}}
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
