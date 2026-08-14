import React, { ComponentProps } from 'react'
import { VscChevronDownCompact, VscKebabVertical } from 'react-icons/vsc'
import { twMerge } from 'tailwind-merge'
import fileNames from '../../lib/fileNames'
import { useTheme } from '../../lib/themeStore'

const PrimarySideBar = () => {
  const theme = useTheme()

  const openFiles = fileNames.filter(fn => fn !== 'activeFile.ts' && fn !== 'selectedFile.tsx')

  return (
    <div
      className="w-75 overflow-hidden rounded border p-2 text-xs"
      style={{
        backgroundColor: theme['sideBar.background'],
        color: theme['sideBar.foreground'],
        borderColor: theme['surface.border'],
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
        <File>{openFiles[4]}.ts</File>
        <File active>activeFile.ts</File>
        <File>{openFiles[1]}.ts</File>
        <File active selected>
          selectedFile.tsx
        </File>
        <File>{openFiles[7]}</File>
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
      {fileNames.map(name => (
        <File active={name === 'selectedFile.tsx'} key={name}>
          {name}
        </File>
      ))}
    </div>
  )
}

interface FileProps extends ComponentProps<'p'> {
  active?: boolean
  selected?: boolean
}

const File = ({ active, selected, children }: FileProps) => {
  const theme = useTheme()

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
