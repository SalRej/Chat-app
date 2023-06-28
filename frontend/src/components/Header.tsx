import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = (): JSX.Element => {
  return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h5" align="center">Todo App</Typography>
            </Toolbar>
        </AppBar>
  )
}

export default Header
