import { Avatar } from '@mui/material'
import React from 'react'

interface PanelProps {
  theme: any
}

const Panel: React.FC<PanelProps> = ({ theme }: PanelProps) => (
  <div id="coding-area" className="flex w-full overflow-hidden rounded border">
    <div
      style={{
        // position: 'absolute',
        // left: 0,
        // bottom: 0,
        background: theme['panel.background'],
        color: theme['panelTitle.activeForeground'],
        fontSize: '10px',
        width: '100%',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          id="panel-title"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            padding: '4px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: '.25rem',
              color: theme['panelTitle.activeForeground'],
              opacity: 0.75,
            }}
          >
            PROBLEMS
          </div>
          <Avatar
            style={{
              width: '13px',
              height: '12px',
              fontSize: '10px',
              backgroundColor: theme['badge.background'],
              color: theme['badge.foreground'],
              alignItems: 'center',
              paddingTop: '1px',
            }}
          >
            2
          </Avatar>
          <div
            style={{
              padding: '.25rem',
              color: theme['panelTitle.activeForeground'],
              opacity: 0.75,
            }}
          >
            DEBUG
          </div>
          <div
            style={{
              padding: '.25rem',
              color: theme['panelTitle.activeForeground'],
              borderBottom: `1px solid ${theme['panelTitle.activeBorder']}`,
            }}
          >
            TERMINAL
          </div>
        </div>
        <div
          style={{
            display: 'block',
            background: theme['terminal.background'],
            paddingLeft: '8px',
            height: '60px',
            color: 'white',
          }}
        >
          {`C:\\> `}
        </div>
      </div>
    </div>
  </div>
)

export default Panel
