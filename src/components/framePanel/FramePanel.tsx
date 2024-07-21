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
  renderSideActions?: ReactNode
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

      {/*project header*/}
      <div className="flex w-full gap-4 justify-between items-center">
        {props.inverse && (
          <>
            <div className="flex gap-4 items-center">
              {props.renderHeader}
            </div>
            <div>
              <FrameConnector size={frameConnectorSize} className="hidden md:!flex scale-[-1]"/>
            </div>
          </>)}

        {props.renderTitle
          ? props.renderTitle
          : <Text component="h1" variant="header1"
                  className="!text-3 md:!text-5 xl:!text-8 !leading-0">{props.title}</Text>
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

      {
        breakpoint.isMobile && (
          <FrameConnectorNode
            size={frameConnectorSize}
            className="!inline !w-fit !scale-x-[-1] !rotate-90 !origin-center"
            fill={lightJsTokens.nbFrameBackgroundPrimary}
          />
        )
      }

      {/*project content*/}
      <div className=" flex h-full items-stretch">
        {!props.inverse &&
          <FrameConnector
            size={frameConnectorSize}
            className=" flex items-stretch"
            divider={breakpoint.isMobile}
            vertical
          />
        }

        {/*body*/}
        <div className=" flex flex-1 flex-col gap-4 pt-4">
          <div className=" flex flex-1 px-4">
            {props.children}
          </div>
          <FrameConnector size={frameConnectorSize} divider/>
        </div>

        {props.inverse &&
          <FrameConnector
            size={frameConnectorSize}
            className=" flex items-stretch scale-[-1]"
            vertical
            secondNode={{hidden: true}}
          />
        }
      </div>
    </div>
  )
}
