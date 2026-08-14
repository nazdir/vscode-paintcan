import React from 'react'
import { VscArrowLeft, VscArrowRight, VscLayoutPanel, VscLayoutSidebarLeft, VscLayoutSidebarRight, VscTerminalTmux, VscVscode } from 'react-icons/vsc'
import { useTheme } from '../../lib/themeStore'

const TitleBar = () => {
  const theme = useTheme()

  return (
    <div id="title-bar">
      <div
        className="grid w-full grid-cols-3 items-center justify-between px-3 py-1 text-xs"
        style={{
          backgroundColor: theme['titleBar.activeBackground'],
          color: theme['titleBar.activeForeground'],
        }}
      >
        <div className="flex justify-start gap-3">
          <VscVscode size="1rem" color="white" />
          <div>File</div>
          <div>Edit</div>
          <div>Selection</div>
          <div>View</div>
          <div>Go</div>
          <div>Run</div>
          <div>Terminal</div>
          <div>Help</div>
        </div>
        <div className="flex justify-center gap-3 pt-2 pl-2.5">
          <div className="w-200 rounded border px-1 py-0.5 opacity-50">VSCode Paint</div>
        </div>
        <div className="flex justify-end gap-3 pt-2 pl-2.5">
          <VscTerminalTmux size=".9rem" />
          <VscLayoutSidebarLeft size=".9rem" />
          <VscLayoutPanel size=".9rem" />
          <VscLayoutSidebarRight size=".9rem" />
        </div>
      </div>
    </div>
  )
}

export default TitleBar
