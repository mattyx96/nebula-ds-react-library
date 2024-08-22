import {Buttons} from "./pages/Buttons.tsx";
import {Panels} from "./pages/Panels.tsx";
import {useState} from "react";
import {Button} from "./components/button/Button.tsx";
import {TypographyPage} from "./pages/Typography.tsx";
import {FrameConnectorPage} from "./pages/FrameConnectorPage.tsx";
import {HorizonPage} from "./pages/HorizonPage.tsx";
import {FramePanelPage} from "./pages/FramePanelPage.tsx";

const Pages = ['buttons', 'panels', 'typography', 'frameConnector', 'horizon', 'framePanel'] as const

export default function App() {
  const [page, setPage] = useState<typeof Pages[number]>('buttons');
  // console.log(tw.generateTailwindCompatibleTheme())
  return (
    <div className="bg-background-primary">
      <div className="flex items-center gap-3 p-5 flex-wrap">
        {Pages.map((_page) => (
          <Button
            key={_page}
            variant="text"
            size="S"
            disabled={page === _page}
            onClick={() => setPage(_page)}
            text={_page.charAt(0).toUpperCase() + _page.slice(1)}
          />
        ))}
      </div>
      <div
        className="reflative container mx-auto min-h-screen min-w-screen gap-5 flex flex-col justify-center items-center pt-10">
        {page === 'buttons' && <Buttons/>}
        {page === 'panels' && <Panels/>}
        {page === 'typography' && <TypographyPage/>}
        {page === 'frameConnector' && <FrameConnectorPage/>}
        {page === 'framePanel' && <FramePanelPage/>}
        {page === 'horizon' && <HorizonPage/>}
      </div>
    </div>
  )
}
