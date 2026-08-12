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
    <Button size={breakpoint.isDesktop ? 'M' : 'S'} className={breakpoint.isDesktop ? 'nb-demo-ml-2' : 'nb-demo-ml-1 nb-demo-w-full'}
            rounded="R"
            variant="outlined" text="Open"
            rightIcon={<ArrowRightIcon/>}/>
  </>

  const sideActions = <>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
    <IconButton size={breakpoint.isDesktop ? 'M' : 'S'} variant="standard" icon={<CodeBracketIcon/>}/>
  </>


  return (
    <div className="nb-demo-full">
      <FramePanel
        className="nb-demo-flex-grow"
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
        <div className="nb-demo-full__content"/>
      </FramePanel>
    </div>
  )
}
