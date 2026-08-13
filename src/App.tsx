import React, { useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import tinycolor from 'tinycolor2'
import './App.css'
import CodeDisplay from './components/CodeDisplay'

const createColorObj = (hex: string) => {
  let darkest = new tinycolor(hex)
  let lightest = new tinycolor(hex)
  while (darkest.getBrightness() > 30) {
    darkest.darken(1)
  }

  while (lightest.getBrightness() < 80) {
    lightest.lighten(1)
  }

  const main = new tinycolor(hex)
  const dark = new tinycolor(hex).darken(10)
  const light = new tinycolor(hex).lighten(10)

  return {
    main,
    dark,
    darkest,
    light,
    lightest,
    hex: new tinycolor(hex).toHexString(),
    darkHex: new tinycolor(hex).darken(10).toHexString(),
    lightHex: new tinycolor(hex).darken(10).toHexString(),
    darkestHex: darkest.desaturate(40).toHexString(),
    lightestHex: lightest.desaturate(40).toHexString(),
  }
}

const convertToStrings = (theme: { [k: string]: tinycolor.Instance }) =>
  Object.fromEntries(
    Object.entries(theme).map(([k, v]) => {
      return v.getAlpha() === 1 ? [k, v.toHexString()] : [k, v.toHex8String()]
    }),
  )

const App: React.FC = () => {
  const [_primary, setPrimary] = useState<ColorResult>()
  const [_secondary, setSecondary] = useState<ColorResult>()
  const [_tertiary, setTertiary] = useState<ColorResult>()

  // const primary = createColorObj(_primary?.hex ?? '#4e0001')
  // const secondary = createColorObj(_secondary?.hex ?? '#eeeeee')
  // const tertiary = createColorObj(_tertiary?.hex ?? '#daa520')

  const primary = createColorObj(_primary?.hex ?? '#19677d')
  const secondary = createColorObj(_secondary?.hex ?? '#dab020')
  const tertiary = createColorObj(_tertiary?.hex ?? '#ffffff')

  const white = new tinycolor('#eeeeee')
  const black = new tinycolor('#111111')

  const text = primary.main.isLight() ? black : white
  const badgeText = tertiary.main.isLight() ? black : white

  const theme = {
    primary: primary.main,
    secondary: secondary.main,
    tertiary: tertiary.main,
    'activityBar.background': primary.main,
    'activityBar.foreground': secondary.main,
    'activityBar.inactiveForeground': secondary.main.clone().setAlpha(0.6),
    'activityBarBadge.background': tertiary.main,
    'activityBarBadge.foreground': badgeText,
    'badge.background': tertiary.lightest,
    'badge.foreground': tertiary.darkest,
    'list.activeSelectionBackground': secondary.dark.clone().setAlpha(0.4),
    'list.focusBackground': secondary.darkest.clone().setAlpha(0.4),
    'list.hoverBackground': secondary.darkest.clone().setAlpha(0.4),
    'list.inactiveSelectionBackground': secondary.dark.clone().setAlpha(0.2),
    'panel.background': primary.darkest,
    'panelTitle.activeBorder': tertiary.main,
    'panelTitle.activeForeground': secondary.main,
    'sideBar.background': primary.darkest,
    'sideBar.foreground': white,
    'sideBarSectionHeader.background': primary.main,
    'sideBarSectionHeader.foreground': text,
    'statusBar.background': primary.dark,
    'statusBar.foreground': secondary.main,
    'statusBarItem.hoverBackground': primary.main,
    'tab.activeBorder': primary.main,
    'terminal.background': primary.darkest.clone().darken(5),
    'titleBar.activeBackground': primary.dark,
    'titleBar.activeForeground': secondary.main,
    'titleBar.inactiveBackground': primary.dark.clone().setAlpha(0.6),
    'titleBar.inactiveForeground': secondary.main.clone().setAlpha(0.6),
  }

  const code = {
    settings: {
      'workbench.colorCustomizations': convertToStrings(theme),
    },
  }

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr_auto] gap-2">
      <div className="flex w-60 flex-col items-center justify-around">
        <div className="text-center font-bold">
          <h1>Primary</h1>
          <ChromePicker
            disableAlpha
            color={primary?.hex}
            onChange={c => {
              setPrimary(c)
            }}
          />
        </div>
        <div className="text-center font-bold">
          <h1>Secondary</h1>
          <ChromePicker
            disableAlpha
            color={secondary?.hex}
            onChange={c => {
              setSecondary(c)
            }}
          />
        </div>
        <div className="text-center font-bold">
          <h1>Tertiary</h1>
          <ChromePicker
            disableAlpha
            color={tertiary?.hex}
            onChange={c => {
              setTertiary(c)
            }}
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <CodeDisplay theme={convertToStrings(theme)} />
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
