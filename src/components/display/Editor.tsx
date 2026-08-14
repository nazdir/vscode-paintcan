import React, { ComponentProps } from 'react'
import { VscChatSparkle, VscChevronRightCompact, VscEditorLayout, VscGitMerge } from 'react-icons/vsc'
import tinycolor from 'tinycolor2'
import { darkForeground } from '../../lib/adHocColors'
import fileNames from '../../lib/fileNames'
import { useTheme } from '../../lib/themeStore'

const Editor = () => {
  const theme = useTheme()

  const openFiles = fileNames.filter(fn => fn !== 'activeFile.ts' && fn !== 'selectedFile.tsx')

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded border"
      style={{
        background: theme['editor.background'],
        borderColor: theme['surface.border'],
      }}
    >
      <div className="flex w-full shrink-0 justify-between p-1">
        <div className="flex gap-2">
          <Tab>{openFiles[4]}</Tab>
          <Tab active>activeFile.ts</Tab>
          <Tab>{openFiles[1]}</Tab>
          <Tab active selected>
            selectedFile.tsx
          </Tab>
          <Tab>{openFiles[7]}</Tab>
        </div>
        <div className="text-md flex items-center gap-2 px-3 text-white">
          <VscGitMerge />
          <VscChatSparkle />
          <VscEditorLayout />
        </div>
      </div>
      <div className="flex items-center px-3" style={{ color: theme['foreground'] }}>
        src
        <VscChevronRightCompact />
        components
        <VscChevronRightCompact />
        selectedFile.tsx
      </div>
      <TextBlock />
    </div>
  )
}

interface TabProps extends ComponentProps<'div'> {
  active?: boolean
  selected?: boolean
}

const Tab = ({ active, selected, children }: TabProps) => {
  return (
    <div
      className="rounded px-1 py-0.5 font-bold text-white/50"

      style={{
        color: selected ? 'white' : undefined,
        backgroundColor: selected ? darkForeground() : undefined,
      }}
    >
      {children}
    </div>
  )
}

const TextBlock = () => {
  return (
    <div className="flex w-full min-w-0 flex-1 overflow-hidden rounded px-4 font-mono text-xs text-white">
      <pre className="min-w-0 overflow-hidden whitespace-pre">
        {`import React, { useMemo, useState } from 'react'

interface WidgetConfig {
  id: string
  label: string
  enabled: boolean
  priority: number
}

export function FakeEditorWidget() {
  const [items, setItems] = useState<WidgetConfig[]>([
    { id: 'alpha', label: 'Alpha', enabled: true, priority: 2 },
    { id: 'beta', label: 'Beta', enabled: false, priority: 1 },
    { id: 'gamma', label: 'Gamma', enabled: true, priority: 3 },
  ])

  const visibleItems = useMemo(
    () => items.filter((item) => item.enabled).sort((a, b) => b.priority - a.priority),
    [items]
  )

  const toggleItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    )
  }

  return (
    <section className="widget-panel">
      <header>
        <h2>Widget Console</h2>
        <button onClick={() => toggleItem('alpha')}>Toggle Alpha</button>
      </header>

      <ul>
        {visibleItems.map((item) => (
          <li key={item.id}>
            {item.label} · {item.priority}
          </li>
        ))}
      </ul>
    </section>
  )
}
`}
      </pre>
    </div>
  )
}

export default Editor
