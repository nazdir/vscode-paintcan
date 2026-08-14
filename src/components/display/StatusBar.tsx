import React from 'react'
import { VscBell, VscCheckCompact, VscCopilot, VscErrorCompact, VscGitBranch, VscRemoteExplorer, VscWarning, VscWarningCompact } from 'react-icons/vsc'
import { useTheme } from '../../lib/themeStore'

const StatusBar = () => {
  const theme = useTheme()

  return (
    <div
      id="status-bar"
      className="flex w-full items-center justify-between p-1 pt-0"
      style={{
        backgroundColor: theme['statusBar.background'],
        color: theme['statusBar.foreground'],
      }}
    >
      <div id="left" className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded p-1 text-xs" style={{ backgroundColor: theme['statusBarItem.remoteBackground'], color: theme['statusBarItem.remoteForeground'] }}>
          <VscRemoteExplorer />
          WSL: Ubuntu
        </div>
        <span className="flex items-center">
          <VscGitBranch />
          paintcan
        </span>
        <span className="flex items-center gap-1">
          <VscWarningCompact /> 1
          <VscErrorCompact />2
        </span>
      </div>
      <div id="right" className="flex items-center gap-3 pr-2">
        <p>Ln 1, Col 29</p>
        <p>LF</p>
        <p>{`\{ \}`} Typescript JSX</p>
        <span className="flex items-center">
          <VscCopilot />
          Learn Yourself
        </span>
        <span className="flex items-center">
          <VscCheckCompact />
          Prettier
        </span>
        <span className="flex items-center">
          <VscBell />
        </span>
      </div>
    </div>
  )
}

export default StatusBar
