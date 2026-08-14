import tinycolor from 'tinycolor2'
import { create } from 'zustand'

const createColorObj = (hex: string) => {
  const darker = new tinycolor(hex)
  const lighter = new tinycolor(hex)
  const darkest = new tinycolor(hex)
  const lightest = new tinycolor(hex)

  while (darker.getBrightness() > 30) {
    darker.darken(1)
    darkest.darken(1)
  }

  while (lighter.getBrightness() < 80) {
    lighter.lighten(1)
    lightest.lighten(1)
  }

  while (darkest.getBrightness() > 20) {
    darkest.darken(1)
  }

  while (lightest.getBrightness() < 90) {
    lightest.lighten(1)
  }

  const main = new tinycolor(hex)
  const dark = new tinycolor(hex).darken(10)
  const light = new tinycolor(hex).lighten(10)

  return {
    main,
    dark,
    darker,
    darkest,
    light,
    lighter,
    lightest,
    hex: new tinycolor(hex).toHexString(),
  }
}

const convertToStrings = (theme: Record<keyof Theme, tinycolor.Instance>): Theme =>
  Object.fromEntries(
    Object.entries(theme).map(([k, v]) => {
      return v.getAlpha() === 1 ? [k, v.toHexString()] : [k, v.toHex8String()]
    }),
  ) as unknown as Theme

export interface Theme {
  primary: string
  secondary: string
  tertiary: string
  'activityBar.background': string
  'activityBar.border': string
  'activityBar.foreground': string
  'activityBar.inactiveForeground': string
  'activityBarBadge.background': string
  'activityBarBadge.foreground': string
  'badge.background': string
  'badge.foreground': string
  'button.background': string
  'button.foreground': string
  'button.hoverBackground': string
  'editor.background': string
  'focusBorder': string
  'foreground': string
  'input.background': string
  'list.activeSelectionBackground': string
  'list.focusBackground': string
  'list.hoverBackground': string
  'list.inactiveSelectionBackground': string
  'menu.background': string
  'menu.foreground': string
  'panel.background': string
  'panelTitle.activeBorder': string
  'panelTitle.activeForeground': string
  'panelTitle.inactiveForeground': string
  'panelTitleBadge.background': string
  'panelTitleBadge.foreground': string
  'sideBar.background': string
  'sideBar.foreground': string
  'sideBarSectionHeader.background': string
  'sideBarSectionHeader.foreground': string
  'statusBar.background': string
  'statusBar.foreground': string
  'statusBarItem.hoverBackground': string
  'statusBarItem.remoteBackground': string
  'statusBarItem.remoteForeground': string
  'statusBarItem.remoteHoverBackground': string
  'statusBarItem.remoteHoverForeground': string
  'surface.border': string
  'tab.activeBorder': string
  'terminal.background': string
  'titleBar.activeBackground': string
  'titleBar.activeForeground': string
  'titleBar.inactiveBackground': string
  'titleBar.inactiveForeground': string
}

const buildTheme = (primaryHex: string, secondaryHex: string, tertiaryHex: string): Theme => {
  const primary = createColorObj(primaryHex)
  const secondary = createColorObj(secondaryHex)
  const tertiary = createColorObj(tertiaryHex)

  const white = new tinycolor('#eeeeee')
  const black = new tinycolor('#111111')
  const magenta = new tinycolor('#ff00ff')

  const text = primary.main.isLight() ? black : white
  const badgeText = tertiary.main.isLight() ? black : white

  const rawTheme: Record<keyof Theme, tinycolor.Instance> = {
    primary: primary.main,
    secondary: secondary.main,
    tertiary: tertiary.main,
    'activityBar.background': primary.main,
    'activityBar.border': primary.main,
    'activityBar.foreground': secondary.main,
    'activityBar.inactiveForeground': secondary.main.clone().setAlpha(0.6),
    'activityBarBadge.background': tertiary.main,
    'activityBarBadge.foreground': badgeText,
    'badge.background': tertiary.lighter,
    'badge.foreground': tertiary.darker,
    'button.background': primary.main,
    'button.hoverBackground': primary.light,
    'button.foreground': text,
    'editor.background': primary.darkest,
    'focusBorder': primary.main,
    'foreground': text, //text,
    'input.background': primary.darkest,
    'list.activeSelectionBackground': secondary.dark.clone().setAlpha(0.4),
    'list.focusBackground': secondary.darker.clone().setAlpha(0.4),
    'list.hoverBackground': secondary.darker.clone().setAlpha(0.4),
    'list.inactiveSelectionBackground': secondary.dark.clone().setAlpha(0.2),
    'menu.background': primary.darker,
    'menu.foreground': white,
    'panel.background': primary.darker,
    'panelTitle.activeBorder': tertiary.main, //panel tabs
    'panelTitle.activeForeground': secondary.main, //panel tabs
    'panelTitle.inactiveForeground': secondary.main.clone().setAlpha(0.6).desaturate(75), //panel tabs
    'panelTitleBadge.background': tertiary.main,
    'panelTitleBadge.foreground': badgeText,
    'sideBar.background': primary.darker,
    'sideBar.foreground': white,
    'sideBarSectionHeader.background': primary.main,
    'sideBarSectionHeader.foreground': text,
    'statusBar.background': primary.main,
    'statusBar.foreground': secondary.main,
    'statusBarItem.hoverBackground': primary.main,
    'statusBarItem.remoteBackground': primary.dark,
    'statusBarItem.remoteForeground': secondary.main,
    'statusBarItem.remoteHoverBackground': secondary.main,
    'statusBarItem.remoteHoverForeground': primary.main,
    'surface.border': primary.main,
    'tab.activeBorder': primary.main,
    'terminal.background': primary.darkest,
    'titleBar.activeBackground': primary.main,
    'titleBar.activeForeground': secondary.main,
    'titleBar.inactiveBackground': primary.darker,
    'titleBar.inactiveForeground': secondary.main.clone().setAlpha(0.6),
  }

  return convertToStrings(rawTheme)
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
  primary: '#4e0001',
  secondary: '#eeeeee',
  tertiary: '#daa520',
}

export const useThemeStore = create<ThemeState>(set => ({
  ...defaults,
  theme: buildTheme(defaults.primary, defaults.secondary, defaults.tertiary),
  setPrimary: hex => set(state => ({ primary: hex, theme: buildTheme(hex, state.secondary, state.tertiary) })),
  setSecondary: hex => set(state => ({ secondary: hex, theme: buildTheme(state.primary, hex, state.tertiary) })),
  setTertiary: hex => set(state => ({ tertiary: hex, theme: buildTheme(state.primary, state.secondary, hex) })),
}))

export const useTheme = () => useThemeStore(state => state.theme)
