import React from 'react'

interface TitleBarProps {
  theme: any
}

const TitleBar: React.FC<TitleBarProps> = ({ theme }: TitleBarProps) => (
  <div id="title-bar">
    <div
      className="flex w-full items-center gap-2 p-1"
      style={{
        backgroundColor: theme['titleBar.activeBackground'],
        color: theme['titleBar.activeForeground'],
      }}
    >
      <div>File</div>
      <div>Edit</div>
      <div>Selection</div>
    </div>
  </div>
)

export default TitleBar
