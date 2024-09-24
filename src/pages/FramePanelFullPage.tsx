import {FramePanel} from "../components/framePanel/FramePanel.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {ArrowRightIcon, CodeBracketIcon, SwatchIcon} from "@heroicons/react/16/solid";
import {Button} from "../components/button/Button.tsx";
import {useBreakpoint} from "../hook/useBreakpoint.ts";
import {useState} from "react";

export const FramePanelFullPage = () => {

  const [inverse, setInverse] = useState(false);

  const breakpoint = useBreakpoint();

  const actions = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="outlined" icon={<CodeBracketIcon/>}/>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="R" text="Open" rightIcon={<ArrowRightIcon/>}/>
  </>

  const actionsFooter = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} rounded="R" variant="outlined" text="Open"
            rightIcon={<ArrowRightIcon/>}/>
  </>

  const sideActions = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
  </>


  return (
    <div className="absolute inset-0 flex flex-col p-5 bg-background-primary h-screen w-screen">
      <FramePanel
        className="flex flex-col flex-grow"
        renderHeader={actions}
        renderFooter={actionsFooter}
        renderSide={sideActions}
        renderSideHeader={
          <IconButton
            size={breakpoint.isDesktop ? 'M' : 'S'}
            rounded="LTop"
            variant="standard"
            icon={<SwatchIcon/>}
            onClick={() => setInverse(!inverse)}
          />}
        title="Welcome"
        inverse={inverse}
      >
        <div className="flex flex-col flex-grow bg-background-accent-200 w-full rounded-lg"/>
      </FramePanel>
    </div>
  )
}
