import React from 'react'
import { useTheme } from '../lib/themeStore'
import ActivityBar from './display/ActivityBar'
import Editor from './display/Editor'
import Panel from './display/Panel'
import PrimarySideBar from './display/PrimarySideBar'
import SecondarySideBar from './display/SecondarySideBar'
import StatusBar from './display/StatusBar'
import TitleBar from './display/TitleBar'

const CodeDisplay: React.FC = () => {
  const theme = useTheme()

  return (
    <div className="h-11/12 w-full overflow-hidden rounded" style={{ backgroundColor: theme['titleBar.activeBackground'] }}>
      <div className="grid h-full grid-rows-[auto_1fr_auto]">
        <TitleBar />
        <div className="flex min-h-0 gap-2 p-2">
          <ActivityBar />
          <PrimarySideBar />
          <div className="flex w-full flex-col gap-2">
            <div className="h-full">
              <Editor />
            </div>
            <div className="h-fit">
              <Panel />
            </div>
          </div>
          <SecondarySideBar />
        </div>
        <StatusBar />
      </div>
    </div>
  )
}

export default CodeDisplay
