import React, { ComponentProps } from 'react'
import fileNames from '../../lib/fileNames'
import { useTheme } from '../../lib/themeStore'

const Editor = () => {
  const theme = useTheme()

  const openFiles = fileNames.filter(fn => fn !== 'activeFile.ts' && fn !== 'selectedFile.tsx')

  return (
    <div
      className="overflow-hidden rounded"
      style={{
        background: theme['editor.background'],
      }}
    >
      <div className="flex w-full justify-between">
        <div className="flex">
          <Tab>{openFiles[4]}</Tab>
          <Tab active>activeFile.ts</Tab>
          <Tab>{openFiles[1]}</Tab>
          <Tab active selected>
            selectedFile.tsx
          </Tab>
          <Tab>{openFiles[7]}</Tab>
        </div>
        <div>BUTTONS</div>
      </div>
      <TextBlock />
    </div>
  )
}

interface TabProps extends ComponentProps<'div'> {
  active?: boolean
  selected?: boolean
}

const Tab = ({ children }: TabProps) => {
  const theme = useTheme()
  return (
    <div
      className="rounded p-0.5"

      style={
        {
          // color: theme['editor.background'],
        }
      }
    >
      {children}
    </div>
  )
}

const TextBlock = () => {
  return (
    <div className="flex h-full w-full min-w-0 overflow-hidden rounded p-4 font-mono text-xs text-white">
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
