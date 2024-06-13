import {FrameConnector} from "../components/frameConnector/FrameConnector.tsx";
import {Button} from "../components/button/Button.tsx";
import {IconButton} from "../components/button/IconButton.tsx";
import {ArrowLeftIcon, MagnifyingGlassPlusIcon, StarIcon} from "@heroicons/react/24/outline";

export const FrameConnectorPage = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-1 gap-4 items-end">
        <IconButton icon={<ArrowLeftIcon/>} size="M" variant="standard" rounded="LTop"/>
        <h5 className="font-orbitron-0">Metal OX</h5>
        <FrameConnector/>
        <Button size="M" rounded="R" text="cosmiq" rightIcon={<StarIcon/>}/>
      </div>

      <FrameConnector divider/>

      <div className="flex flex-1 gap-4 items-end">
        <FrameConnector firstNode={{hidden: true}} className="scale-y-[-1]"/>
        <Button className="w-60" size="M" variant="standard" rounded="R" text="zoom"
                rightIcon={<MagnifyingGlassPlusIcon/>}/>
      </div>
    </div>
  )
}

