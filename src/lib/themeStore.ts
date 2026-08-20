import tinycolor from 'tinycolor2'
import { create } from 'zustand'

const createColorObj = (hex: string) => {
  const maxAdjustments = 300
  const darker = new tinycolor(hex)
  const lighter = new tinycolor(hex)
  const darkest = new tinycolor(hex)
  const lightest = new tinycolor(hex)

  for (let adjustment = 0; darker.getBrightness() > 30 && adjustment < maxAdjustments; adjustment += 0.5) {
    const previousColor = darker.toHex8String()
    darker.darken(0.5)
    darkest.darken(0.5)
    if (darker.toHex8String() === previousColor) break
  }

  for (let adjustment = 0; lighter.getBrightness() < 80 && adjustment < maxAdjustments; adjustment += 0.5) {
    const previousColor = lighter.toHex8String()
    lighter.lighten(0.5)
    lightest.lighten(0.5)
    if (lighter.toHex8String() === previousColor) break
  }

  for (let adjustment = 0; darkest.getBrightness() > 20 && adjustment < maxAdjustments; adjustment += 0.5) {
    const previousColor = darkest.toHex8String()
    darkest.darken(0.5)
    if (darkest.toHex8String() === previousColor) break
  }

  for (let adjustment = 0; lightest.getBrightness() < 90 && adjustment < maxAdjustments; adjustment += 0.5) {
    const previousColor = lightest.toHex8String()
    lightest.lighten(0.5)
    if (lightest.toHex8String() === previousColor) break
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
  // 'activityBar.border': string //? not used
  // 'activityBar.foreground': string //? not used
  'activityBar.inactiveForeground': string
  'activityBarBadge.background': string
  'activityBarBadge.foreground': string
  'badge.background': string
  'badge.foreground': string
  'breadcrumb.foreground': string
  'button.background': string
  'button.foreground': string
  'button.hoverBackground': string
  'editor.background': string
  // 'focusBorder': string //? not used
  // 'foreground': string //* don't want
  'icon.foreground': string
  'input.background': string
  'list.activeSelectionBackground': string
  'list.focusBackground': string
  'list.hoverBackground': string
  'list.inactiveSelectionBackground': string
  'menu.background': string
  'menu.foreground': string
  'modernActivityBar.activeForeground': string
  'modernActivityBar.hoverForeground': string
  'modernActivityBar.hoverBackground': string
  'modernActivityBar.activeBackground': string
  'panel.background': string
  'panelTitle.activeBorder': string
  'panelTitle.activeForeground': string
  'panelTitle.inactiveForeground': string
  'panelTitleBadge.background': string
  'panelTitleBadge.foreground': string
  'sideBar.background': string
  'sideBar.foreground': string
  // 'sideBarSectionHeader.background': string //? not used
  'sideBarSectionHeader.foreground': string
  'statusBar.background': string
  'statusBar.foreground': string
  'statusBarItem.hoverBackground': string
  'statusBarItem.hoverForeground': string
  'statusBarItem.remoteBackground': string
  'statusBarItem.remoteForeground': string
  'statusBarItem.remoteHoverBackground': string
  'statusBarItem.remoteHoverForeground': string
  'surface.border': string
  'tab.activeBorder': string
  'tab.inactiveForeground': string
  'terminal.background': string
  'titleBar.activeBackground': string
  'titleBar.activeForeground': string
  'titleBar.inactiveBackground': string
  'titleBar.inactiveForeground': string
  // 'modernEditorTab.activeActionBackground': string //* don't want
  // 'modernEditorTab.activeHoverActionBackground': string //* don't want
  // 'modernEditorTab.hoverActionBackground': string //* don't want
  'modernEditorTab.activeBackground': string
  'modernEditorTab.activeForeground': string
  'modernEditorTab.activeHoverBackground': string
  'modernEditorTab.hoverBackground': string
  'modernEditorTab.hoverForeground': string
  'modernEditorTab.inactiveBackground': string
  // 'modernEditorTab.selectedActionBackground': string //* don't want
  'modernTab.activeBackground': string
  'modernTab.activeForeground': string
  'modernTab.hoverBackground': string
  'modernTab.hoverForeground': string

  'primary.main'?: string
  'primary.dark'?: string
  'primary.darker'?: string
  'primary.darkest'?: string
  'primary.light'?: string
  'primary.lighter'?: string
  'primary.lightest'?: string
  'secondary.main'?: string
  'secondary.dark'?: string
  'secondary.darker'?: string
  'secondary.darkest'?: string
  'secondary.light'?: string
  'secondary.lighter'?: string
  'secondary.lightest'?: string
  'tertiary.main'?: string
  'tertiary.dark'?: string
  'tertiary.darker'?: string
  'tertiary.darkest'?: string
  'tertiary.light'?: string
  'tertiary.lighter'?: string
  'tertiary.lightest'?: string
}

const createReadable = (background: tinycolor.Instance, foreground: tinycolor.Instance) => {
  const readability = 3
  const maxAdjustments = 100
  const adjustedForeground = foreground.clone()

  if (background.isDark()) {
    for (let adjustment = 0; adjustment < maxAdjustments; adjustment += 1) {
      const currentReadability = tinycolor.readability(background, adjustedForeground)
      if (!Number.isFinite(currentReadability) || currentReadability >= readability) break

      const previousColor = adjustedForeground.toHex8String()
      adjustedForeground.lighten(1)
      if (adjustedForeground.toHex8String() === previousColor) break
    }
  } else if (background.isLight()) {
    for (let adjustment = 0; adjustment < maxAdjustments; adjustment += 1) {
      const currentReadability = tinycolor.readability(background, adjustedForeground)
      if (!Number.isFinite(currentReadability) || currentReadability >= readability) break

      const previousColor = adjustedForeground.toHex8String()
      adjustedForeground.darken(1)
      if (adjustedForeground.toHex8String() === previousColor) break
    }
  }

  return adjustedForeground
}

const buildTheme = (primaryHex: string, secondaryHex: string, tertiaryHex: string): Theme => {
  const primary = createColorObj(primaryHex)
  const secondary = createColorObj(secondaryHex)
  const tertiary = createColorObj(tertiaryHex)

  const white = new tinycolor('#eeeeee')
  const black = new tinycolor('#111111')
  const magenta = new tinycolor('#ff00ff')

  const readableOnMain = createReadable(primary.main, secondary.main)
  const readableOnDark = createReadable(primary.darker, secondary.main)

  const rawTheme: Record<keyof Theme, tinycolor.Instance> = {
    primary: primary.main,
    secondary: secondary.main,
    tertiary: tertiary.main,
    'activityBar.background': primary.main,
    'activityBar.inactiveForeground': primary.main.isDark() ? secondary.dark : secondary.light,
    'activityBarBadge.background': tertiary.main,
    'activityBarBadge.foreground': tertiary.main.isLight() ? black : white,
    'badge.background': tertiary.main,
    'badge.foreground': tertiary.main.isLight() ? black : white,
    'button.background': primary.main,
    'button.hoverBackground': primary.light,
    'button.foreground': readableOnMain,
    'editor.background': primary.darkest,
    // 'foreground': createReadable(primary.darkest, primary.light), //text,
    'breadcrumb.foreground': createReadable(primary.darkest, primary.light), //text,
    'icon.foreground': primary.main.isDark() ? secondary.light : secondary.dark,
    'input.background': primary.darkest,
    'list.activeSelectionBackground': primary.light.clone().setAlpha(0.4),
    'list.focusBackground': primary.lighter.clone().setAlpha(0.4),
    'list.hoverBackground': primary.lightest.clone().setAlpha(0.4),
    'list.inactiveSelectionBackground': primary.light,
    'menu.background': primary.darker,
    'menu.foreground': white,
    'modernActivityBar.activeForeground': secondary.light,
    'modernActivityBar.hoverForeground': secondary.light,
    'modernActivityBar.hoverBackground': primary[primary.main.isLight() ? 'light' : 'dark'].clone().setAlpha(0.5),
    'modernActivityBar.activeBackground': primary[primary.main.isLight() ? 'light' : 'dark'].clone().setAlpha(0.5),
    'panel.background': primary.darker,
    'panelTitle.activeBorder': tertiary.main, //panel tabs
    'panelTitle.activeForeground': readableOnDark, //panel tabs
    'panelTitle.inactiveForeground': readableOnDark.clone().setAlpha(0.6).desaturate(75), //panel tabs
    'panelTitleBadge.background': tertiary.main,
    'panelTitleBadge.foreground': tertiary.main.isLight() ? black : white,
    'sideBar.background': primary.darker,
    'sideBar.foreground': white,
    'sideBarSectionHeader.foreground': readableOnDark,
    'statusBar.background': primary.main,
    'statusBar.foreground': secondary.main,
    'statusBarItem.hoverBackground': primary.light,
    'statusBarItem.hoverForeground': secondary.light,
    'statusBarItem.remoteBackground': primary.dark,
    'statusBarItem.remoteForeground': secondary.main,
    'statusBarItem.remoteHoverBackground': secondary.main,
    'statusBarItem.remoteHoverForeground': primary.main,
    'surface.border': primary.main,
    'tab.activeBorder': secondary.main,
    'tab.inactiveForeground': white,
    'terminal.background': primary.darkest,
    'titleBar.activeBackground': primary.main,
    'titleBar.activeForeground': secondary.main,
    'titleBar.inactiveBackground': primary.darker,
    'titleBar.inactiveForeground': secondary.main.clone().setAlpha(0.75),
    'modernEditorTab.activeBackground': primary.main,
    'modernEditorTab.activeForeground': white,
    'modernEditorTab.activeHoverBackground': primary.main,
    'modernEditorTab.hoverBackground': primary.dark,
    'modernEditorTab.hoverForeground': primary.lightest,
    'modernEditorTab.inactiveBackground': primary.darkest,
    'modernTab.activeBackground': primary.darker,
    'modernTab.activeForeground': secondary.main,
    'modernTab.hoverBackground': primary.dark,
    'modernTab.hoverForeground': secondary.main,
    'primary.main': primary.main,
    'primary.dark': primary.dark,
    'primary.darker': primary.darker,
    'primary.darkest': primary.darkest,
    'primary.light': primary.light,
    'primary.lighter': primary.lighter,
    'primary.lightest': primary.lightest,
    'secondary.main': secondary.main,
    'secondary.dark': secondary.dark,
    'secondary.darker': secondary.darker,
    'secondary.darkest': secondary.darkest,
    'secondary.light': secondary.light,
    'secondary.lighter': secondary.lighter,
    'secondary.lightest': secondary.lightest,
    'tertiary.main': tertiary.main,
    'tertiary.dark': tertiary.dark,
    'tertiary.darker': tertiary.darker,
    'tertiary.darkest': tertiary.darkest,
    'tertiary.light': tertiary.light,
    'tertiary.lighter': tertiary.lighter,
    'tertiary.lightest': tertiary.lightest,
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
  // primary: '#4e0001',
  // secondary: '#eeeeee',
  // tertiary: '#daa520',
  // primary: '#eeeeee',
  // secondary: '#640000',
  // tertiary: '#000000',
  'primary': '#114452',
  'secondary': '#dab020',
  'tertiary': '#ffffff',
}

export const useThemeStore = create<ThemeState>(set => ({
  ...defaults,
  theme: buildTheme(defaults.primary, defaults.secondary, defaults.tertiary),
  setPrimary: hex => set(state => ({ primary: hex, theme: buildTheme(hex, state.secondary, state.tertiary) })),
  setSecondary: hex => set(state => ({ secondary: hex, theme: buildTheme(state.primary, hex, state.tertiary) })),
  setTertiary: hex => set(state => ({ tertiary: hex, theme: buildTheme(state.primary, state.secondary, hex) })),
}))

export const useTheme = () => useThemeStore(state => state.theme)
