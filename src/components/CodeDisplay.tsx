import { Grid, Avatar, Stack } from '@mui/material'
import React from 'react'
import { FiAlertCircle, FiGrid, FiSave, FiFile } from 'react-icons/fi'

interface CodeDisplayProps {
  theme: any
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ theme }: CodeDisplayProps) => {
  const TitleBar = () => (
    <div id="title-bar">
      <div
        style={{
          backgroundColor: theme['titleBar.activeBackground'],
          display: 'flex',
          paddingTop: '.5rem',
          paddingBottom: '.5rem',
          alignItems: 'center',
          color: theme['titleBar.activeForeground'],
          justifyContent: 'start',
          width: '100%',
          height: '1rem',
        }}
      >
        <div style={{ marginRight: '.5rem', marginLeft: '.5rem' }}>File</div>
        <div style={{ marginRight: '.5rem' }}>Edit</div>
        <div style={{ marginRight: '.5rem' }}>Selection</div>
      </div>
    </div>
  )

  const ActivityBar = () => (
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

  const SideBar = () => (
    <div
      style={{
        width: '10rem',
        backgroundColor: theme['sideBar.background'],
        color: theme['sideBar.foreground'],
        lineHeight: '18px',
        fontSize: 12,
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          backgroundColor: theme['sideBarSectionHeader.background'],
          color: theme['sideBarSectionHeader.foreground'],
        }}
      >
        OPEN EDITORS
      </div>
      <div>file</div>
      <div>file</div>
      <div
        style={{
          backgroundColor: theme['sideBarSectionHeader.background'],
          color: theme['sideBarSectionHeader.foreground'],
        }}
      >
        WORKSPACE
      </div>
      <div>file</div>
      <div style={{ backgroundColor: theme['list.hoverBackground'] }}>hover</div>
      <div>file</div>
      <div style={{ backgroundColor: theme['list.focusBackground'] }}>focus</div>
      <div>file</div>
      <div style={{ backgroundColor: theme['list.activeSelectionBackground'] }}>active</div>
      <div>file</div>
      <div style={{ backgroundColor: theme['list.inactiveSelectionBackground'] }}>inactive</div>
      <div>file</div>
    </div>
  )

  const CodingArea = () => (
    <div id="coding-area" style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
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
            }}
          >
            {`C:\\> `}
          </div>
        </div>
      </div>
    </div>
  )

  const StatusBar = () => (
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

  return (
    <div style={{ backgroundColor: '#1e1e1e', width: '100%', height: 'fit-content', fontSize: 14 }}>
      <TitleBar />
      <Stack direction="row">
        <ActivityBar />
        <SideBar />
        <CodingArea />
      </Stack>
      <StatusBar />
    </div>
  )
}

export default CodeDisplay
