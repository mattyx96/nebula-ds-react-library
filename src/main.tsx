import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from './components/themeProvider/ThemeProvider.tsx'
import {FlashProvider} from './components/flash/FlashProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <FlashProvider>
        <App/>
      </FlashProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
