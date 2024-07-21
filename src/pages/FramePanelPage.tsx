import {FramePanel} from "../components/framePanel/FramePanel.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {ArrowRightIcon, CodeBracketIcon} from "@heroicons/react/16/solid";
import {Button} from "../components/button/Button.tsx";
import {useBreakpoint} from "../hook/useBreakpoint.ts";

export const FramePanelPage = () => {

  const breakpoint = useBreakpoint();

  function openURL(arg0: string): void {
    throw new Error("Function not implemented." + arg0,);
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <FramePanel
        title="Nebula Design System"
        renderHeader={
          <>
            <IconButton
              size={breakpoint.isDesktop ? 'M' : 'S'} variant="outlined" icon={<CodeBracketIcon/>}
              onClick={() => openURL('https://github.com/mattyx96/nebula-ds-react-library')}
            />
            <Button
              size={breakpoint.isDesktop ? 'M' : 'S'} rounded="R" text="Open" rightIcon={<ArrowRightIcon/>}
              onClick={() => openURL('https://nebula-ds-react-library.irongalaxy.space/')}
            />
          </>
        }
        /*renderTitle={
          <Text variant="header1" component="h3" className="!text-2xl md:!text-3xl xl:!text-5xl !leading-0">
            Nebula Design System
          </Text>
        }*/
      >
        <div className="h-64 bg-background-contrast-primary-500 w-full rounded-lg">

        </div>
      </FramePanel>
    </div>
  )
}
