import { ComponentProps } from 'react'
import { VscAddCompact, VscChevronDownCompact, VscCloseCompact } from 'react-icons/vsc'
import { useTheme } from '../../lib/themeStore'

const Panel = () => {
  const theme = useTheme()

  return (
    <div id="bottom-panel" className="flex h-full w-full flex-col overflow-hidden rounded border" style={{ borderColor: theme['surface.border'] }}>
      <div className="flex items-center justify-between p-1 text-xs font-bold" style={{ backgroundColor: theme['panel.background'] }}>
        <div className="flex gap-2">
          <PanelTab selected>Terminal</PanelTab>
          <div className="flex items-center">
            <PanelTab>Problems</PanelTab>
            <Badge />
          </div>
          <PanelTab>Output</PanelTab>
          <PanelTab>Console</PanelTab>
        </div>
        <div className="text-md flex gap-2" style={{ color: theme['icon.foreground'] }}>
          <VscAddCompact />
          <VscChevronDownCompact />
          <VscCloseCompact />
        </div>
      </div>
      <div
        style={{
          background: theme['panel.background'],
          color: theme['panelTitle.activeForeground'],
        }}
      >
        <TextBlock />
      </div>
    </div>
  )
}

interface TabProps extends ComponentProps<'div'> {
  active?: boolean
  selected?: boolean
}

export const PanelTab = ({ active, selected, children }: TabProps) => {
  const theme = useTheme()
  return (
    <div
      className="flex items-center rounded px-1 py-0.5 font-bold"

      style={{
        color: selected ? theme['panelTitle.activeForeground'] : theme['panelTitle.inactiveForeground'],
        backgroundColor: selected ? theme['modernTab.activeBackground'] : undefined,
      }}
    >
      {children}
    </div>
  )
}

const Badge = () => {
  const theme = useTheme()

  return (
    <div
      className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-bold"
      style={{ backgroundColor: theme['activityBarBadge.background'], color: theme['activityBarBadge.foreground'] }}
    >
      7
    </div>
  )
}

const TextBlock = () => {
  const theme = useTheme()

  return (
    <div
      className="flex h-50 w-full px-8 font-mono text-xs whitespace-pre-wrap text-gray-400"
      style={{
        background: theme['terminal.background'],
      }}
    >
      {`nazdir@nazdir:~/projects/vscode-paintcan$ npm run dev

> vscode-paintcan@0.0.0 dev
> vite

  VITE v5.4.10  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

nazdir@nazdir:~/projects/vscode-paintcan$ git status --short
 M src/components/display/Panel.tsx
nazdir@nazdir:~/projects/vscode-paintcan$ `}
    </div>
  )
}

export default Panel
