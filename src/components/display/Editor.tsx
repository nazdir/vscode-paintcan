import React from 'react'
import { useTheme } from '../../lib/themeStore'

const Editor: React.FC = () => {
  const theme = useTheme()

  return (
    <div
      className="flex h-full overflow-hidden rounded"
      style={{
        background: theme['panel.background'],
        color: theme['panelTitle.activeForeground'],
        fontSize: '10px',
      }}
    >
      CODE
    </div>
  )
}

export default Editor
