import {ReactNode} from "react";
import {FrameConnector, FrameConnectorNode} from "../frameConnector/FrameConnector";
import {Text} from "../typography/Typography";
import {useBreakpoint} from "../../hook/useBreakpoint.ts";
import useElementDimensions from "../../hook/useElementDimentions.ts";
import {lightJsTokens} from "nebula-ds-tokens";

type Props = ({ title: string; renderTitle?: undefined } | { renderTitle: ReactNode; title?: undefined }) & {
  className?: string
  children: ReactNode
  renderHeader: ReactNode
  renderFooter?: ReactNode
  renderSide?: ReactNode
  inverse?: boolean
  //add renderFooter
  //add renderSide
}

export const FramePanel = (props: Props) => {
  const breakpoint = useBreakpoint();
  const {dimensions, ref} = useElementDimensions();

  const frameConnectorSize = breakpoint.isDesktop ? 'M' : 'S';
  const isHeaderFrameConnectorOneNodeWidth = () => {
    if (breakpoint.isDesktop) {
      return dimensions.width <= 130
    } else {
      return dimensions.width <= 90
    }
  }

  const isHeaderFrameConnectorHidden = () => {
    if (breakpoint.isDesktop) {
      return dimensions.width <= 70
    } else {
      return dimensions.width <= 50
    }
  }

  return (
    <div className={`w-full flex flex-col ${props.className}`}>

      {/* header */}
      <div className="flex w-full gap-4 justify-between items-center">
        {props.inverse && (
          <>
            <div className="flex gap-4 items-center">
              {props.renderHeader}
            </div>
            <div ref={ref} className="w-full flex flex-1 scale-[-1]">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: isHeaderFrameConnectorOneNodeWidth()}}
                />
              }
            </div>
          </>)}

        {props.renderTitle
          ? props.renderTitle
          : <Text component="h1" variant="header1"
                  className="!text-2xl md:!text-3xl xl:!text-5xl !leading-0">{props.title}</Text>
        }

        {!props.inverse && (
          <>
            <div ref={ref} className="w-full flex flex-1 scale-[-1]">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  secondNode={{hidden: isHeaderFrameConnectorOneNodeWidth()}}
                />
              }
            </div>
            <div className="flex gap-4 items-center">
              {props.renderHeader}
            </div>
          </>)}
      </div>
      {/* end header */}

      {/* body container */}
      <div className={`flex flex-1 flex-col`}>

        {/* main vertical container (used for mobile side actions )*/}
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
        {/*end main vertical container (used for mobile side actions )*/}

        {/* level 2 - body here */}
        <div className=" flex h-full items-stretch">
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
          <div className=" flex flex-1 flex-col gap-4 pt-4">
            <div className=" flex flex-1 px-4">
              {props.children}
            </div>
            {/* footer */}
            <div className="flex items-end gap-4 h-fit">
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
