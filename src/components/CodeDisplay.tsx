import React from 'react'
import ActivityBar from './display/ActivityBar'
import CodingArea from './display/CodingArea'
import PrimarySideBar from './display/PrimarySideBar'
import SecondarySideBar from './display/SecondarySideBar'
import StatusBar from './display/StatusBar'
import TitleBar from './display/TitleBar'

interface CodeDisplayProps {
  theme: any
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ theme }: CodeDisplayProps) => (
  <div className="h-11/12 w-full overflow-hidden rounded" style={{ backgroundColor: theme['titleBar.activeBackground'] }}>
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <TitleBar theme={theme} />
      <div className="flex min-h-0 gap-2 p-2">
        <ActivityBar theme={theme} />
        <PrimarySideBar theme={theme} />
        <CodingArea theme={theme} />
        <SecondarySideBar theme={theme} />
      </div>
      <StatusBar theme={theme} />
    </div>
  </div>
)

export default CodeDisplay
