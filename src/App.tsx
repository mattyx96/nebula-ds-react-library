import {Buttons} from "./pages/Buttons.tsx";
import {Panels} from "./pages/Panels.tsx";
import {useState} from "react";
import {Button} from "./components/button/Button.tsx";
import {TypographyPage} from "./pages/Typography.tsx";
import {FrameConnectorPage} from "./pages/FrameConnectorPage.tsx";
import {HorizonPage} from "./pages/HorizonPage.tsx";
import {FramePanelPage} from "./pages/FramePanelPage.tsx";
import {TokensPage} from "./pages/Tokens.tsx";
import {FramePanelFullPage} from "./pages/FramePanelFullPage.tsx";
import {useTheme} from "./components/themeProvider/themeContext.ts";

const Pages = ['tokens', 'buttons', 'panels', 'typography', 'frameConnector', 'horizon', 'framePanel', "framePanelFullPage"] as const

export default function App() {
  const [page, setPage] = useState<typeof Pages[number]>('buttons');
  const {theme, setTheme} = useTheme();
  // console.log(tw.generateTailwindCompatibleTheme())
  return (
    <div className="nb-app">
      <nav className="nb-app__nav">
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
        <Button
          variant="outlined"
          size="S"
          text={theme === 'light' ? 'Dark' : 'Light'}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </nav>
      <main className="nb-app__main">
        {page === 'buttons' && <Buttons/>}
        {page === 'panels' && <Panels/>}
        {page === 'typography' && <TypographyPage/>}
        {page === 'frameConnector' && <FrameConnectorPage/>}
        {page === 'framePanel' && <FramePanelPage/>}
        {page === 'framePanelFullPage' && <FramePanelFullPage/>}
        {page === 'horizon' && <HorizonPage/>}
        {page === 'tokens' && <TokensPage/>}
      </main>
    </div>
  )
}
