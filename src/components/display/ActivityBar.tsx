import React from 'react'
import { VscAccount, VscExtensions, VscFiles, VscGithub, VscSearch, VscSettingsGear, VscSourceControl } from 'react-icons/vsc'

import { useTheme } from '../../lib/themeStore'

const ActivityBar = () => {
  const theme = useTheme()

  return (
    <div
      id="activity-bar"
      className="flex h-full w-5 flex-col items-center justify-between overflow-hidden rounded p-1 pb-2 text-xl"
      style={{
        backgroundColor: theme['activityBar.background'],
        color: theme['activityBar.inactiveForeground'],
      }}
    >
      <div className="flex flex-col gap-4">
        <VscFiles className="rounded p-0.5" style={{ color: theme['modernActivityBar.activeForeground'], backgroundColor: theme['modernActivityBar.activeBackground'] }} />
        <VscSearch />
        <div className="relative">
          <VscSourceControl />
          <Badge />
        </div>
        <VscGithub />
        <VscExtensions />
      </div>
      <div className="flex flex-col gap-4">
        <VscAccount />
        <VscSettingsGear />
      </div>
    </div>
  )
}

const Badge = () => {
  const theme = useTheme()

  return (
    <div
      className="absolute -right-0.5 -bottom-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-bold"
      style={{ backgroundColor: theme['activityBarBadge.background'], color: theme['activityBarBadge.foreground'] }}
    >
      4
    </div>
  )
}

export default ActivityBar
