import React from 'react'

interface StatusBarProps {
  theme: any
}

const StatusBar: React.FC<StatusBarProps> = ({ theme }: StatusBarProps) => (
  <div
    id="status-bar"
    style={{
      backgroundColor: theme['statusBar.background'],
      display: 'flex',
      alignItems: 'center',
      color: theme['statusBar.foreground'],
      justifyContent: 'start',
      width: '100%',
      height: '1.5rem',
    }}
  >
    <div style={{ marginLeft: '.5rem', height: '100%' }}>master</div>
  </div>
)

export default StatusBar
