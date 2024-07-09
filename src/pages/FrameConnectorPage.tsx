import {FrameConnector} from "../components/frameConnector/FrameConnector.tsx";
import {Button} from "../components/button/Button.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {ArrowLeftIcon, MagnifyingGlassPlusIcon, StarIcon} from "@heroicons/react/24/outline";
import {Text} from "../components/typography/Typography.tsx";

export const FrameConnectorPage = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-1 gap-4 items-end">
        <IconButton icon={<ArrowLeftIcon/>} size="M" variant="standard" rounded="LTop"/>
        <Text component="h1" variant="header2">Metal OX</Text>
        <FrameConnector/>
        <Button size="M" rounded="R" text="cosmiq" rightIcon={<StarIcon/>}/>
      </div>

      <FrameConnector divider/>

      <div className="flex flex-1 gap-4 items-end">
        <FrameConnector firstNode={{hidden: true}} className="scale-y-[-1]"/>
        <Button className="w-60" size="M" variant="standard" rounded="R" text="zoom"
                rightIcon={<MagnifyingGlassPlusIcon/>}/>
      </div>

      <div className="h-[45rem] w-full flex justify-end">
        <FrameConnector className="scale-[-1]" vertical/>
      </div>
    </div>
  )
}

