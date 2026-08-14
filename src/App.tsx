import React from 'react'
import { ChromePicker } from 'react-color'
import { VscCopy } from 'react-icons/vsc'
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

  const copyTheme = async () => {
    const settings = JSON.stringify(code.settings, null, 2)
    await navigator.clipboard.writeText(settings.slice(1, -1))
  }

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr_auto] items-center gap-2 overflow-hidden bg-[#1e1e1e]">
      <div className="flex h-99/100 min-h-0 w-60 flex-col items-center justify-center gap-10 overflow-y-auto text-white">
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
      <div className="flex h-99/100 min-h-0 min-w-0 flex-1 items-center">
        <CodeDisplay />
      </div>
      <div className="flex h-99/100 min-h-0 w-100 items-center">
        <div className="h-full w-full rounded bg-[#1e1e1e] p-2">
          <button className="flex items-center gap-1 rounded border border-white px-2 text-white" type="button" onClick={copyTheme}>
            <VscCopy />
            Copy
          </button>
          <JSONPretty data={code} className="w-full text-xs"></JSONPretty>
        </div>
      </div>
    </div>
  )
}

export default App
