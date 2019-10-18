import React, { useState } from 'react'
import './App.css'
import { ChromePicker, ColorResult } from 'react-color'
import { Container, Grid, Box, Avatar } from '@material-ui/core'
import { FiAlertCircle, FiGrid, FiSave, FiFile } from 'react-icons/fi'
import tinycolor from 'tinycolor2'
import JSONPretty from 'react-json-pretty'

const App: React.FC = () => {
  const JSONPrettyMon = require('react-json-pretty/dist/monikai')
  const [primary, setPrimary] = useState<ColorResult>()
  const [secondary, setSecondary] = useState<ColorResult>()
  const [tertiary, setTertiary] = useState<ColorResult>()

  const c1 = primary ? primary.hex : '#4E0001'
  const c2 = secondary ? secondary.hex : '#eeeeee'
  const c3 = tertiary ? tertiary.hex : '#DAA520'
  const white = '#eeeeee'
  const black = '#111111'

  let c1dark = tinycolor(c1)
    .darken(10)
    .toHexString()

  let c1darkest = tinycolor(c1)
    .darken(10)
    .desaturate(50)
    .toHexString()

  let c2dark = tinycolor(c2)
    .darken(10)
    .toHexString()

  let c2darkest = tinycolor(c2)
    .darken(10)
    .desaturate(50)
    .toHexString()

  while (tinycolor(c1darkest).getBrightness() > 30) {
    c1darkest = tinycolor(c1darkest)
      .darken(1)
      .toHexString()
  }

  while (tinycolor(c2darkest).getBrightness() > 50) {
    c2darkest = tinycolor(c2darkest)
      .darken(1)
      .toHexString()
  }

  const text = tinycolor(c1).isLight() ? black : white
  const badgeText = tinycolor(c3).isLight() ? black : white

  const code = {
    settings: {
      'workbench.colorCustomizations': {
        'activityBar.background': c1,
        'activityBar.foreground': c2,
        'activityBar.inactiveForeground': `${c2}99`,
        'activityBarBadge.background': c3,
        'activityBarBadge.foreground': badgeText,
        // 'editorGroup.border': c1,
        'list.activeSelectionBackground': `${c2dark}66`,
        'list.focusBackground': `${c2darkest}66`,
        'list.hoverBackground': `${c2darkest}66`,
        'list.inactiveSelectionBackground': `${c2dark}33`,
        'panel.background': c1darkest,
        // 'panel.border': c1,
        'panelTitle.activeBorder': c3,
        'panelTitle.activeForeground': c2,
        'sideBar.background': c1darkest,
        // 'sideBar.border': c1,
        'sideBarSectionHeader.background': c1,
        'sideBarSectionHeader.foreground': text,
        'statusBar.background': c1dark,
        'statusBar.foreground': c2,
        'statusBarItem.hoverBackground': c1,
        'tab.activeBorder': c1,
        'terminal.background': c1darkest,
        'titleBar.activeBackground': c1dark,
        'titleBar.activeForeground': c2,
        'titleBar.inactiveBackground': `${c1dark}99`,
        'titleBar.inactiveForeground': `${c2}99`,
      },
    },
  }

  return (
    <Container style={{ padding: '5rem' }}>
      {/* top half */}
      <Grid container style={{ marginBottom: '2rem' }}>
        <Grid item xs={4}>
          <ChromePicker
            disableAlpha
            color={c1}
            onChange={c => {
              setPrimary(c)
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ChromePicker
            disableAlpha
            color={c2}
            onChange={c => {
              setSecondary(c)
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <ChromePicker
            disableAlpha
            color={c3}
            onChange={c => {
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
                  backgroundColor: c1dark,
                  display: 'flex',
                  padding: '.5rem',
                  alignItems: 'center',
                  color: c2,
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
                  backgroundColor: c1,
                  width: '1rem',
                  height: '15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                  color: c2,
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
                      backgroundColor: c3,
                      color: badgeText,
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
                  backgroundColor: c1darkest,
                  color: white,
                  fontSize: 14,
                  lineHeight: '18px',
                }}
              >
                <div style={{ backgroundColor: c1, fontWeight: 'bold', color: text }}>
                  OPEN EDITORS
                </div>
                <div>file</div>
                <div>file</div>
                <div style={{ backgroundColor: c1, color: text }}>WORKSPACE</div>
                <div>file</div>
                <div style={{ backgroundColor: `${c2darkest}66` }}>hover</div>
                <div>file</div>
                <div style={{ backgroundColor: `${c2darkest}66` }}>focus</div>
                <div>file</div>
                <div style={{ backgroundColor: `${c2dark}66` }}>active</div>
                <div>file</div>
                <div style={{ backgroundColor: `${c2dark}33` }}>inactive</div>
                <div>file</div>
              </Box>
              <Box
                style={{
                  position: 'absolute',
                  padding: '1rem',
                  bottom: 0,
                  display: 'flex',
                  marginLeft: '13rem',
                  background: c1darkest,
                  color: `${c2}66`,
                  fontSize: '10px',
                }}
              >
                <div style={{ padding: '.25rem' }}>PROBLEMS</div>
                <div style={{ padding: '.25rem' }}>DEBUG</div>
                <div style={{ padding: '.25rem', color: c2, borderBottom: `1px solid ${c3}` }}>
                  TERMINAL
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* status bar */}
              <Box
                style={{
                  backgroundColor: c1dark,
                  display: 'flex',
                  padding: '.25rem',
                  alignItems: 'center',
                  color: c2,
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
          <JSONPretty data={code} theme={JSONPrettyMon}></JSONPretty>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
