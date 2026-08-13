import React from 'react'
import { VscVscode } from 'react-icons/vsc'

interface TitleBarProps {
  theme: any
}

const TitleBar: React.FC<TitleBarProps> = ({ theme }: TitleBarProps) => (
  <div id="title-bar">
    <div
      className="flex w-full items-center gap-3 pt-2 pl-2.5 text-xs"
      style={{
        backgroundColor: theme['titleBar.activeBackground'],
        color: theme['titleBar.activeForeground'],
      }}
    >
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
  </div>
)

export default TitleBar
