import tinycolor from 'tinycolor2'
import { useTheme } from './themeStore'

export const darkForeground = () => {
  const theme = useTheme()

  return new tinycolor(theme['foreground']).setAlpha(0.3).toHex8String()
}
