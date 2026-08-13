import React from 'react'
import { VscAccount, VscExtensions, VscFiles, VscGithub, VscSearch, VscSettingsGear, VscSourceControl } from 'react-icons/vsc'

interface ActivityBarProps {
  theme: any
}

const ActivityBar: React.FC<ActivityBarProps> = ({ theme }: ActivityBarProps) => (
  <div
    id="activity-bar"
    className="flex h-full w-10 flex-col justify-between overflow-hidden rounded p-1 pb-2 text-2xl"
    style={{
      backgroundColor: theme['activityBar.background'],
      color: theme['activityBar.foreground'],
    }}
  >
    <div className="flex flex-col gap-4">
      <VscFiles />
      <VscSearch />
      <div className="relative">
        <VscSourceControl />
        <Badge theme={theme} />
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

const Badge: React.FC<ActivityBarProps> = ({ theme }: ActivityBarProps) => (
  <div
    className="absolute -right-1 -bottom-1 flex h-4 w-4 justify-center rounded-full text-xs"
    style={{ backgroundColor: theme['activityBarBadge.background'], color: theme['activityBarBadge.foreground'] }}
  >
    4
  </div>
)

export default ActivityBar
