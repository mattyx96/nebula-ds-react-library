import {FrameConnector} from "../components/frameConnector/FrameConnector.tsx";
import {Button} from "../components/button/Button.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {ArrowLeftIcon, MagnifyingGlassPlusIcon, StarIcon} from "@heroicons/react/24/outline";
import {Text} from "../components/typography/Typography.tsx";

export const FrameConnectorPage = () => {
  return (
    <div className="nb-demo-frame-connector">


      <div className="nb-demo-frame-connector__row">
        <IconButton icon={<ArrowLeftIcon/>} size="L" variant="standard" rounded="LTop"/>
        <Text component="h1" variant="header1" className="nb-demo-leading-0">Metal OX</Text>
        <FrameConnector size="L"/>
        <Button size="L" rounded="R" text="cosmiq" rightIcon={<StarIcon/>}/>
      </div>

      <div className="nb-demo-frame-connector__row">
        <IconButton icon={<ArrowLeftIcon/>} size="M" variant="standard" rounded="LTop"/>
        <Text component="h1" variant="header2">Metal OX</Text>
        <FrameConnector size="M"/>
        <Button size="M" rounded="R" text="cosmiq" rightIcon={<StarIcon/>}/>
      </div>

      <div className="nb-demo-frame-connector__row">
        <IconButton icon={<ArrowLeftIcon/>} size="S" variant="standard" rounded="LTop"/>
        <Text component="h1" variant="header4">Metal OX</Text>
        <FrameConnector size="S"/>
        <Button size="S" rounded="R" text="cosmiq" rightIcon={<StarIcon/>}/>
      </div>

      <FrameConnector divider/>
      <FrameConnector firstNode={{hidden: true}}/>

      <div className="nb-demo-frame-connector__row">
        <FrameConnector firstNode={{hidden: true}} className="nb-demo-frame-connector__flip"/>
        <Button className="nb-demo-w-full" size="M" variant="standard" rounded="R" text="zoom"
                rightIcon={<MagnifyingGlassPlusIcon/>}/>
      </div>

      <div className="nb-demo-frame-connector__vertical">
        <FrameConnector className="nb-demo-frame-connector__flip" vertical/>
      </div>
    </div>
  )
}
