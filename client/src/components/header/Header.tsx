import React from 'react'

import { Typography, Container, Toolbar, AppBar, Box } from '@mui/material'

import LoginButtons from './LoginButtons';

// TODO Show/hide LoginButtons and LogoutButton if user is loggedin or not
function Header() {
  return (
    <AppBar style={{ background: 'transparent', boxShadow: 'none' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#407BFF',
              textDecoration: 'none',
            }}
          >
            Planify
          </Typography>

          <Box sx={{ flexGrow: 0 }}>

            <LoginButtons />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header