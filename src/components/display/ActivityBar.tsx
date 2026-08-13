import { Avatar } from '@mui/material'
import React from 'react'
import { FiAlertCircle, FiFile, FiGrid, FiSave } from 'react-icons/fi'

interface ActivityBarProps {
  theme: any
}

const ActivityBar: React.FC<ActivityBarProps> = ({ theme }: ActivityBarProps) => (
  <div
    id="activity-bar"
    style={{
      backgroundColor: theme['activityBar.background'],
      width: '1rem',
      height: '18rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      color: theme['activityBar.foreground'],
      justifyContent: 'space-around',
    }}
  >
    <div style={{ position: 'relative' }}>
      <FiAlertCircle size="2rem" />
      <Avatar
        style={{
          width: '1rem',
          height: '1rem',
          fontSize: '12px',
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: theme['activityBarBadge.background'],
          color: theme['activityBarBadge.foreground'],
        }}
      >
        4
      </Avatar>
    </div>
    <FiGrid size="2rem" style={{ opacity: 0.9 }} />
    <FiSave size="2rem" style={{ opacity: 0.8 }} />
    <FiFile size="2rem" style={{ opacity: 0.7 }} />
  </div>
)

export default ActivityBar
