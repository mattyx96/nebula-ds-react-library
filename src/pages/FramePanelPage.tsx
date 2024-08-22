import {FramePanel} from "../components/framePanel/FramePanel.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {Text} from "../components/typography/Typography.tsx";
import {ArrowRightIcon, CodeBracketIcon} from "@heroicons/react/16/solid";
import {Button} from "../components/button/Button.tsx";
import {useBreakpoint} from "../hook/useBreakpoint.ts";

export const FramePanelPage = () => {

  const breakpoint = useBreakpoint();

  const actions = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="outlined" icon={<CodeBracketIcon/>}/>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="R" text="Open" rightIcon={<ArrowRightIcon/>}/>
  </>

  const actionsInverse = <>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="L" text="Open" rightIcon={<ArrowRightIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="outlined" icon={<CodeBracketIcon/>}/>
  </>

  const actionsFooter = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="R" variant="outlined" text="Open"
            rightIcon={<ArrowRightIcon/>}/>
  </>

  const actionsFooterInverse = <>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="L" variant="outlined" text="Open"
            rightIcon={<ArrowRightIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
  </>

  const sideActions = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
  </>


  return (
    <div className="w-full flex flex-col gap-10 px-1 py-32">
      <FramePanel
        renderHeader={actions}
        renderFooter={actionsFooter}
        renderSide={sideActions}
        renderTitle={
          <Text variant="header1" component="h3" className="!text-5 !font-orbitron-0 md:!text-5 xl:!text-8 !leading-0">
            Nebula Design System
          </Text>
        }
      >
        <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
      </FramePanel>

      <FramePanel
        title="Nebula Design System"
        renderHeader={actionsInverse}
        renderFooter={actionsFooterInverse}
        renderSide={sideActions}
        inverse
      >
        <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
      </FramePanel>

      <div className="grid grid-cols-2">
        <FramePanel
          className="col-span-1"
          title="Nebula Design System"
          renderHeader={actionsInverse}
          renderFooter={actionsFooterInverse}
          renderSide={sideActions}
          inverse
        >
          <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
        </FramePanel>
      </div>

    </div>
  )
}


/**
 * add this to a page as a wrapper to test its responsiveness
 * NB: need to add router to handle pages for this demo app
 */

/*
<div className="w-full flex flex-col gap-10 container" style={{
      resize: "both",
      overflow: "auto",
      border: "2px solid black",
    }}>
      <iframe src="https://nebula-ds-react-library.irongalaxy.space/">
 */
