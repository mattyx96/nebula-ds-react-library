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
    <div className="nb-demo-frame-panel">
      <FramePanel
        renderHeader={actions}
        renderFooter={actionsFooter}
        renderSide={sideActions}
        renderTitle={
          <Text variant="header1" component="h3" className="nb-demo-frame-panel__title">
            Nebula Design System
          </Text>
        }
      >
        <div className="nb-demo-fill"/>
      </FramePanel>

      <FramePanel
        title="Nebula Design System"
        renderHeader={actionsInverse}
        renderFooter={actionsFooterInverse}
        renderSide={sideActions}
        inverse
      >
        <div className="nb-demo-fill"/>
      </FramePanel>

      <FramePanel
        title="Nebula Design System"
        renderSide={sideActions}
        inverse
      >
        <div className="nb-demo-fill"/>
      </FramePanel>

      <div className="nb-demo-frame-panel__grid">
        <FramePanel
          title="Nebula Design System"
          renderHeader={actionsInverse}
          renderFooter={actionsFooterInverse}
          renderSide={sideActions}
          inverse
        >
          <div className="nb-demo-fill"/>
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
