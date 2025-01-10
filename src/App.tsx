import { Avatar, Box, Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { FiAlertCircle, FiFile, FiGrid, FiSave } from 'react-icons/fi'
import JSONPretty from 'react-json-pretty'
import tinycolor from 'tinycolor2'
import './App.css'
import 'react-json-pretty/themes/monikai.css'

const p = '#4e0001'
const s = '#eeeeee'
const t = '#daa520'

const createColorObj = (hex: string) => {
  let darkest = new tinycolor(hex).darken(10).desaturate(50)
  while (darkest.getBrightness() > 30) {
    darkest = darkest.darken(1)
  }
  return {
    main: new tinycolor(hex),
    hex: new tinycolor(hex).toHexString(),
    darkHex: new tinycolor(hex).darken(10).toHexString(),
    darkestHex: new tinycolor(hex).darken(10).desaturate(50).toHexString(),
  }
}

const App: React.FC = () => {
  const [_primary, setPrimary] = useState<ColorResult>()
  const [_secondary, setSecondary] = useState<ColorResult>()
  const [_tertiary, setTertiary] = useState<ColorResult>()

  const primary = createColorObj(_primary?.hex ?? p)
  const secondary = createColorObj(_secondary?.hex ?? s)
  const tertiary = createColorObj(_tertiary?.hex ?? t)

  const white = '#eeeeee'
  const black = '#111111'

  const text = primary.main.isLight() ? black : white
  const badgeText = tertiary.main.isLight() ? black : white

  const code = {
    settings: {
      'workbench.colorCustomizations': {
        'activityBar.background': primary.hex,
        'activityBar.foreground': secondary.hex,
        'activityBar.inactiveForeground': `${secondary.hex}99`,
        'activityBarBadge.background': tertiary.hex,
        'activityBarBadge.foreground': badgeText,
        // 'editorGroup.border': c1,
        'list.activeSelectionBackground': `${secondary.darkHex}66`,
        'list.focusBackground': `${secondary.darkestHex}66`,
        'list.hoverBackground': `${secondary.darkestHex}66`,
        'list.inactiveSelectionBackground': `${secondary.darkHex}33`,
        'panel.background': primary.darkestHex,
        // 'panel.border': c1,
        'panelTitle.activeBorder': tertiary.hex,
        'panelTitle.activeForeground': secondary.hex,
        'sideBar.background': primary.darkestHex,
        'sideBar.foreground': white,
        // 'sideBar.border': c1,
        'sideBarSectionHeader.background': primary.hex,
        'sideBarSectionHeader.foreground': text,
        'statusBar.background': primary.darkHex,
        'statusBar.foreground': secondary.hex,
        'statusBarItem.hoverBackground': primary.hex,
        'tab.activeBorder': primary.hex,
        'terminal.background': primary.darkestHex,
        'titleBar.activeBackground': primary.darkHex,
        'titleBar.activeForeground': secondary.hex,
        'titleBar.inactiveBackground': `${primary.darkHex}99`,
        'titleBar.inactiveForeground': `${secondary.hex}99`,
      },
    },
  }

  const theme = code.settings['workbench.colorCustomizations']

  console.log(theme)

  return (
    <Container style={{ padding: '5rem' }}>
      {/* top half */}
      <Grid container style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ChromePicker
            disableAlpha
            color={primary?.hex}
            onChange={(c) => {
              setPrimary(c)
            }}
          />
          <ChromePicker
            disableAlpha
            color={secondary?.hex}
            onChange={(c) => {
              setSecondary(c)
            }}
          />
          <ChromePicker
            disableAlpha
            color={tertiary?.hex}
            onChange={(c) => {
              setTertiary(c)
            }}
          />
        </Grid>
      </Grid>
      {/* bottom half */}
      <Grid container>
        {/* preview side */}
        <Grid item xs={6} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <Grid container style={{ backgroundColor: '#1e1e1e' }}>
            {/* title bar */}
            <Grid item xs={12}>
              <Box
                style={{
                  backgroundColor: theme['titleBar.activeBackground'],
                  display: 'flex',
                  padding: '.5rem',
                  alignItems: 'center',
                  color: theme['titleBar.activeForeground'],
                  justifyContent: 'start',
                }}
              >
                <div style={{ marginRight: '.5rem' }}>File</div>
                <div style={{ marginRight: '.5rem' }}>Edit</div>
                <div style={{ marginRight: '.5rem' }}>Selection</div>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', position: 'relative' }}>
              {/* side bar */}
              <Box
                style={{
                  backgroundColor: theme['activityBar.background'],
                  width: '1rem',
                  height: '15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                  color: theme['activityBar.foreground'],
                  justifyContent: 'space-around',
                }}
              >
                <Box style={{ position: 'relative' }}>
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
                </Box>
                <FiGrid size="2rem" style={{ opacity: 0.9 }} />
                <FiSave size="2rem" style={{ opacity: 0.8 }} />
                <FiFile size="2rem" style={{ opacity: 0.7 }} />
              </Box>
              {/* file menu */}
              <Box
                style={{
                  width: '10rem',
                  backgroundColor: theme['sideBar.background'],
                  color: theme['sideBar.foreground'],
                  fontSize: 14,
                  lineHeight: '18px',
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
                <div style={{ backgroundColor: theme['list.activeSelectionBackground'] }}>
                  active
                </div>
                <div>file</div>
                <div style={{ backgroundColor: theme['list.inactiveSelectionBackground'] }}>
                  inactive
                </div>
                <div>file</div>
              </Box>
              <Box
                style={{
                  position: 'absolute',
                  padding: '1rem',
                  bottom: 0,
                  display: 'flex',
                  marginLeft: '13rem',
                  background: theme['panel.background'],
                  color: theme['panelTitle.activeForeground'],
                  fontSize: '10px',
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
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* status bar */}
              <Box
                style={{
                  backgroundColor: theme['statusBar.background'],
                  display: 'flex',
                  padding: '.25rem',
                  alignItems: 'center',
                  color: theme['statusBar.foreground'],
                  justifyContent: 'start',
                }}
              >
                <div>master</div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* middle */}
        <Grid item xs={1} />
        {/* code side */}
        <Grid item xs={5}>
          {/* <JSONPretty data={code} theme={JSONPrettyMon}></JSONPretty> */}
          <JSONPretty data={code}></JSONPretty>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
