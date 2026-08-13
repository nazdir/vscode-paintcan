import React from 'react'
import { ChromePicker } from 'react-color'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import './App.css'
import CodeDisplay from './components/CodeDisplay'
import { useThemeStore } from './lib/themeStore'

const App = () => {
  const primary = useThemeStore(state => state.primary)
  const secondary = useThemeStore(state => state.secondary)
  const tertiary = useThemeStore(state => state.tertiary)
  const theme = useThemeStore(state => state.theme)
  const setPrimary = useThemeStore(state => state.setPrimary)
  const setSecondary = useThemeStore(state => state.setSecondary)
  const setTertiary = useThemeStore(state => state.setTertiary)

  const code = {
    settings: {
      'workbench.colorCustomizations': theme,
    },
  }

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr_auto] gap-2">
      <div className="flex w-60 flex-col items-center justify-around">
        <div className="text-center font-bold">
          <h1>Primary</h1>
          <ChromePicker disableAlpha color={primary} onChange={c => setPrimary(c.hex)} />
        </div>
        <div className="text-center font-bold">
          <h1>Secondary</h1>
          <ChromePicker disableAlpha color={secondary} onChange={c => setSecondary(c.hex)} />
        </div>
        <div className="text-center font-bold">
          <h1>Tertiary</h1>
          <ChromePicker disableAlpha color={tertiary} onChange={c => setTertiary(c.hex)} />
        </div>
      </div>
      <div className="flex w-full items-center">
        <CodeDisplay />
      </div>
      <div className="flex w-100 items-center">
        <div className="h-11/12 w-full rounded bg-[#1e1e1e] p-2">
          <JSONPretty data={code} className="w-full text-xs"></JSONPretty>
        </div>
      </div>
    </div>
  )
}

export default App
