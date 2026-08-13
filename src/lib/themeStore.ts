import tinycolor from 'tinycolor2'
import { create } from 'zustand'

const createColorObj = (hex: string) => {
  const darkest = new tinycolor(hex)
  const lightest = new tinycolor(hex)
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

export type Theme = Record<string, string>

const buildTheme = (primaryHex: string, secondaryHex: string, tertiaryHex: string): Theme => {
  const primary = createColorObj(primaryHex)
  const secondary = createColorObj(secondaryHex)
  const tertiary = createColorObj(tertiaryHex)

  const white = new tinycolor('#eeeeee')
  const black = new tinycolor('#111111')

  const text = primary.main.isLight() ? black : white
  const badgeText = tertiary.main.isLight() ? black : white

  return convertToStrings({
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
    focusBorder: primary.main,
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
  })
}

interface ThemeState {
  primary: string
  secondary: string
  tertiary: string
  theme: Theme
  setPrimary: (hex: string) => void
  setSecondary: (hex: string) => void
  setTertiary: (hex: string) => void
}

const defaults = {
  primary: '#19677d',
  secondary: '#dab020',
  tertiary: '#ffffff',
}

export const useThemeStore = create<ThemeState>(set => ({
  ...defaults,
  theme: buildTheme(defaults.primary, defaults.secondary, defaults.tertiary),
  setPrimary: hex => set(state => ({ primary: hex, theme: buildTheme(hex, state.secondary, state.tertiary) })),
  setSecondary: hex => set(state => ({ secondary: hex, theme: buildTheme(state.primary, hex, state.tertiary) })),
  setTertiary: hex => set(state => ({ tertiary: hex, theme: buildTheme(state.primary, state.secondary, hex) })),
}))

export const useTheme = () => useThemeStore(state => state.theme)
