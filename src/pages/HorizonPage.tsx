import Horizon from "../components/horizon/Horizon.tsx";
import {lightJsTokens} from 'nebula-ds-tokens'
import {Button} from "../components/button/Button.tsx";
import {useState} from "react";

export const HorizonPage = () => {
  const [inverse, setInverse] = useState(false);
  return (
    <div className="absolute left-0 right-0 top-20">
      <Button size="S" variant="standard" text="invert" onClick={() => setInverse(!inverse)}/>
      <div className="h-[30rem] w-full bg-background-contrast-primary-500"/>
      {/*<Horizon color={lightJsTokens.nbBackgroundContrastPrimary500} numLines={19} lineThickness={6} distance={4.8}
               distanceGrowthFactor={0.3}
               thicknessDecayFactor={0.85} className="w-full"/>*/}

      <Horizon color={lightJsTokens.nbBackgroundContrastPrimary500} numLines={19} lineThickness={10} distance={7}
               distanceGrowthFactor={1}
               thicknessDecayFactor={0.9} className="w-full" inverse={inverse}/>
    </div>
  )
}

