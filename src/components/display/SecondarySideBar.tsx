import { ComponentProps } from 'react'
import { VscAddCompact, VscCloseCompact, VscCodeOss, VscGitCompare, VscMerge } from 'react-icons/vsc'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../../lib/themeStore'
import { PanelTab } from './Panel'

const SecondarySideBar = () => {
  const theme = useTheme()

  return (
    <div id="secondary-panel" className="flex h-full w-50 flex-col overflow-hidden rounded border" style={{ backgroundColor: theme['panel.background'], borderColor: theme['surface.border'] }}>
      <div className="flex items-center justify-between p-1 text-xs font-bold">
        <div className="flex gap-2">
          <PanelTab selected>GitHub</PanelTab>
          <PanelTab>Chat</PanelTab>
        </div>
        <div className="text-md flex gap-2" style={{ color: theme['icon.foreground'] }}>
          <VscAddCompact />
          <VscCodeOss />
          <VscCloseCompact />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 px-2 text-white">
        <div className="flex items-center gap-2 text-xs">
          <VscGitCompare />
          BASE
          <Input>main</Input>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <VscMerge />
          MERGE
          <Input>paintcan</Input>
        </div>
        <div>
          <div className="flex items-center text-xs">TITLE</div>
          <Input>Implement Paintcan</Input>
        </div>

        <div>
          <div className="flex items-center text-xs">DESCRIPTION</div>
          <Input selected>Themes the VSCode window to allow the user to easily tell repos apart while working on multiple ones</Input>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded border p-1 text-center">Cancel</div>
          <div className="w-full rounded border border-transparent p-1 text-center" style={{ backgroundColor: theme['button.background'], color: theme['button.foreground'] }}>
            Create
          </div>
        </div>
      </div>
    </div>
  )
}

interface InputProps extends ComponentProps<'div'> {
  selected?: boolean
}

const Input = ({ selected, className, children }: InputProps) => {
  const theme = useTheme()
  return (
    <div className={twMerge('flex w-46 rounded px-3 py-1 text-xs', selected ? 'border' : '', className)} style={{ backgroundColor: theme['input.background'] }}>
      {children}
    </div>
  )
}

export default SecondarySideBar
