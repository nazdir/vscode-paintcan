import { Avatar } from '@mui/material'
import React from 'react'

interface EditorProps {
  theme: any
}

const Editor: React.FC<EditorProps> = ({ theme }: EditorProps) => (
  <div
    className="flex h-full overflow-hidden rounded"
    style={{
      // position: 'absolute',
      // left: 0,
      // bottom: 0,
      background: theme['panel.background'],
      color: theme['panelTitle.activeForeground'],
      fontSize: '10px',
      // width: '100%',
    }}
  >
    CODE
  </div>
)

export default Editor
