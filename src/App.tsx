import React, { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'
import { FaMoon, FaSun } from 'react-icons/fa'
import { VscCheck, VscCopy } from 'react-icons/vsc'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import tinycolor from 'tinycolor2'
import './App.css'
import CodeDisplay from './components/CodeDisplay'
import { useTheme, useThemeStore } from './lib/themeStore'

const colors = ['primary', 'secondary', 'tertiary'] as const
const shades = ['main', 'dark', 'darker', 'darkest', 'light', 'lighter', 'lightest'] as const

const App = () => {
  const [copied, setCopied] = useState(false)
  const primary = useThemeStore(state => state.primary)
  const secondary = useThemeStore(state => state.secondary)
  const tertiary = useThemeStore(state => state.tertiary)
  const theme = useThemeStore(state => state.theme)
  const setPrimary = useThemeStore(state => state.setPrimary)
  const setSecondary = useThemeStore(state => state.setSecondary)
  const setTertiary = useThemeStore(state => state.setTertiary)

  useEffect(() => {
    setCopied(false)
  }, [theme])

  const code = {
    settings: {
      'workbench.colorCustomizations': { ...theme },
    },
  }

  colors.forEach(c => {
    shades.forEach(s => {
      delete code.settings['workbench.colorCustomizations'][`${c}.${s}`]
    })
  })

  const copyTheme = async () => {
    const settings = JSON.stringify(code.settings, null, 2)
    await navigator.clipboard.writeText(settings.slice(1, -1) + ',')
    setCopied(true)
  }

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr_auto] items-center gap-2 overflow-hidden bg-[#1e1e1e]">
      <div className="flex h-99/100 min-h-0 w-60 flex-col items-center justify-center gap-10 overflow-y-auto text-white">
        <div className="text-center font-bold">
          <span className="flex w-full items-center justify-center gap-2">
            <h1>Primary</h1>
            {tinycolor(theme['primary']).isLight() ? <FaSun /> : <FaMoon />}
          </span>
          <ChromePicker disableAlpha color={primary} onChange={c => setPrimary(c.hex)} />
          <ColorBlock color="primary" />
        </div>
        <div className="text-center font-bold">
          <span className="flex w-full items-center justify-center gap-2">
            <h1>Secondary</h1>
            {tinycolor(theme['secondary']).isLight() ? <FaSun /> : <FaMoon />}
          </span>
          <ChromePicker disableAlpha color={secondary} onChange={c => setSecondary(c.hex)} />
          <ColorBlock color="secondary" />
        </div>
        <div className="text-center font-bold">
          <span className="flex w-full items-center justify-center gap-2">
            <h1>Tertiary</h1>
            {tinycolor(theme['tertiary']).isLight() ? <FaSun /> : <FaMoon />}
          </span>
          <ChromePicker disableAlpha color={tertiary} onChange={c => setTertiary(c.hex)} />
          <ColorBlock color="tertiary" />
        </div>
      </div>
      <div className="flex h-99/100 min-h-0 min-w-0 flex-1 items-center">
        <CodeDisplay />
      </div>
      <div className="flex h-99/100 min-h-0 w-100 items-center">
        <div className="h-full w-full rounded bg-[#1e1e1e] p-2">
          <button className="flex w-25 items-center gap-1 rounded border border-white/50 px-2 text-white" type="button" onClick={copyTheme}>
            {copied ? <VscCheck /> : <VscCopy />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <div className="h-full overflow-y-scroll">
            <JSONPretty data={code} className="w-full text-xs"></JSONPretty>
          </div>
        </div>
      </div>
    </div>
  )
}

const ColorBlock = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' }) => {
  const theme = useTheme()

  console.log(theme)

  const main = tinycolor(theme[`${color}.main`])
  const light = tinycolor(theme[`${color}.light`])
  const dark = tinycolor(theme[`${color}.dark`])

  console.log(`${color}.main`)

  const copyColor = (value: string) => navigator.clipboard.writeText(value.slice(1))

  return (
    <div className="grid w-full grid-cols-3 items-center overflow-hidden rounded border border-[#1e1e1e] text-xs text-black">
      <span
        className="cursor-pointer p-1"
        role="button"
        tabIndex={0}
        onClick={() => copyColor(dark.toHexString())}
        style={{ backgroundColor: dark.toHexString(), color: dark.isDark() ? 'white' : 'black' }}
      >
        {dark.toHexString()}
      </span>
      <span
        className="cursor-pointer p-1"
        role="button"
        tabIndex={0}
        onClick={() => copyColor(main.toHexString())}
        style={{ backgroundColor: main.toHexString(), color: main.isDark() ? 'white' : 'black' }}
      >
        {main.toHexString()}
      </span>
      <span
        className="cursor-pointer p-1"
        role="button"
        tabIndex={0}
        onClick={() => copyColor(light.toHexString())}
        style={{ backgroundColor: light.toHexString(), color: light.isDark() ? 'white' : 'black' }}
      >
        {light.toHexString()}
      </span>
    </div>
  )
}

export default App
