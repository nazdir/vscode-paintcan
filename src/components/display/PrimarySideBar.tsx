import React from 'react'

interface SideBarProps {
  theme: any
}

const PrimarySideBar: React.FC<SideBarProps> = ({ theme }: SideBarProps) => (
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

export default PrimarySideBar
