import {Buttons} from "./pages/Buttons.tsx";
import {Panels} from "./pages/Panels.tsx";
import {useState} from "react";
import {Button} from "./components/button/Button.tsx";

export default function App() {
  const [page, setPage] = useState<'buttons' | 'panels'>('panels');
  // console.log(tw.generateTailwindCompatibleTheme())
  return (
    <div className="bg-background-primary">
      <div className="flex items-center gap-3 p-5">
        <Button disabled={page === 'buttons'} variant="text" size="S" onClick={() => setPage('buttons')}
                text="Buttons"/>
        <Button disabled={page === 'panels'} variant="text" size="S" onClick={() => setPage('panels')}
                text="Panels"/>
      </div>
      <div
        className="w-3/4 mx-auto min-h-screen min-w-screen gap-5 flex flex-col justify-center items-center pt-10 -translate-y-16">
        {page === 'buttons' && <Buttons/>}
        {page === 'panels' && <Panels/>}
      </div>
    </div>
  )
}
