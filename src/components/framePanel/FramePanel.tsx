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
  const {dimensions, ref} = useElementDimensions();

  const frameConnectorSize = breakpoint.isDesktop ? 'M' : 'S';
  const isHeaderFrameConnectorOneNodeWidth = () => {
    if (breakpoint.isDesktop) {
      return dimensions.width <= 140
    } else {
      return dimensions.width <= 150
    }
  }

  const isHeaderFrameConnectorHidden = () => {
    if (breakpoint.isDesktop) {
      return dimensions.width <= 70
    } else {
      return dimensions.width <= 50
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
            <div ref={ref} className="w-full flex flex-1 scale-[-1]">
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
            <div ref={ref} className="w-full flex flex-1 scale-[-1]">
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
        {breakpoint.isMobile && props.renderSide &&
          <div className={`flex flex-1 flex-col ${props.inverse ? 'items-end' : 'items-start'}`}>

            <div className={`flex flex-1 gap-4 mb-4`}>
              {breakpoint.isMobile && props.renderSide}
            </div>

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
        <div className={`flex h-full flex-grow items-stretch ${props.verticalFrameConnectorContainerClassName || ''}`}>
          {/* non-inverse side actions and connector */}
          {!props.inverse &&
            <div className="flex flex-col justify-items-stretch gap-4">
              {!breakpoint.isMobile && props.renderSide}
              <FrameConnector
                size={frameConnectorSize}
                className="flex flex-1 items-stretch"
                divider={breakpoint.isMobile}
                vertical
              />
            </div>
          }

          {/* body */}
          <div className={`flex flex-1 flex-col flex-grow gap-4`}>
            <div className={`flex flex-1 px-4 ${props.bodyContainerClassName || ''}`}>
              {props.children}
            </div>

            {/* footer */}
            <div className={`flex items-end gap-4 h-fit ${props.footerClassName || ''}`}>
              {props.inverse && props.renderFooter}
              <FrameConnector
                className="h-fit"
                size={frameConnectorSize}
                {...(props.inverse
                    ? {
                      secondNode: {hidden: true},
                      firstNode: {hidden: !props.renderFooter}
                    }
                    : {
                      firstNode: {hidden: true},
                      secondNode: {hidden: !props.renderFooter}
                    }
                )}
              />
              {!props.inverse && props.renderFooter}
            </div>
            {/* end footer */}
          </div>
          {/* end body */}

          {/* inverse side actions and connector */}
          {props.inverse &&
            <div className="flex flex-col justify-items-stretch gap-4">
              {!breakpoint.isMobile && props.renderSide}
              <FrameConnector
                size={frameConnectorSize}
                className="flex flex-1 items-stretch scale-[-1]"
                divider={breakpoint.isMobile}
                vertical
              />
            </div>
          }
        </div>
        {/* end level 2 - body here */}

      </div>
      {/* end body container */}

    </div>
  )
}
