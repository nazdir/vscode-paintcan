import clsx from 'clsx'
import React, { ComponentProps } from 'react'
import { VscChevronDownCompact, VscKebabVertical } from 'react-icons/vsc'
import { twMerge } from 'tailwind-merge'

interface SideBarProps {
  theme: any
}

const PrimarySideBar: React.FC<SideBarProps> = ({ theme }: SideBarProps) => (
  <div
    className="w-75 overflow-hidden rounded p-2 text-xs"
    style={{
      backgroundColor: theme['sideBar.background'],
      color: theme['sideBar.foreground'],
    }}
  >
    <div className="mb-4 flex items-center justify-between">
      <p>Explorer</p>
      <VscKebabVertical />
    </div>

    <div
      className="flex items-center gap-1 font-bold"
      style={{
        color: theme['sideBarSectionHeader.foreground'],
      }}
    >
      <VscChevronDownCompact />
      Open Editors
    </div>
    <div
      className="mb-2 border-b border-white/10 pb-2"
      style={{
        borderColor: theme['activityBar.border'],
      }}
    >
      <File theme={theme}>Inactive File 1</File>
      <File active theme={theme}>
        Active File
      </File>
      <File theme={theme}>Inactive File 2</File>
      <File active selected theme={theme}>
        Selected File
      </File>
      <File theme={theme}>Inactive File 3</File>
    </div>
    <div
      className="flex items-center gap-1 font-bold"
      style={{
        color: theme['sideBarSectionHeader.foreground'],
      }}
    >
      <VscChevronDownCompact />
      Workspace
    </div>
    <File theme={theme}>Inactive File 1</File>
    <File active theme={theme}>
      Active File
    </File>
    <File theme={theme}>Inactive File 2</File>
    <File active selected theme={theme}>
      Selected File
    </File>
    <File theme={theme}>Inactive File 3</File>
  </div>
)

interface FileProps extends ComponentProps<'p'> {
  active?: boolean
  selected?: boolean
  theme: any
}

const File = ({ theme, active, selected, children }: FileProps) => {
  return (
    <p
      className={twMerge('rounded border border-transparent p-0.5 pl-4')}
      style={{
        background: active && selected ? theme['list.activeSelectionBackground'] : active ? theme['list.inactiveSelectionBackground'] : undefined,
        borderColor: active && selected ? theme['focusBorder'] : undefined,
      }}
    >
      {children}
    </p>
  )
}

export default PrimarySideBar
