import {Horizon} from "../components/horizon/Horizon.tsx";
import {lightJsTokens} from 'nebula-ds-tokens'
import {Button} from "../components/button/Button.tsx";
import {useState} from "react";

export const HorizonPage = () => {
  const [inverse, setInverse] = useState(false);
  return (
    <div className={`nb-demo-horizon ${inverse ? 'nb-demo-horizon--bottom' : 'nb-demo-horizon--top'}`}>
      <Button size="S" variant="standard" text="invert" onClick={() => setInverse(!inverse)}/>
      {!inverse && <div className="nb-demo-horizon__fill"/>}
      <Horizon color={lightJsTokens.nbBackgroundContrastPrimary500} numLines={19} lineThickness={10} distance={7}
               distanceGrowthFactor={1}
               thicknessDecayFactor={0.9} className="nb-demo-w-full" inverse={inverse}/>
      {inverse && <div className="nb-demo-horizon__fill"/>}
    </div>
  )
}
