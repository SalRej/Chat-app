import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Header = (): JSX.Element => {
  const navigate = useNavigate()

  const logout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <Box>
      <AppBar position="static">
      <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todos
          </Typography>
          <Link to='/todo'><Button sx={{ color: 'white' }}>Todos</Button></Link>
          <Link to='/chat'><Button sx={{ color: 'white' }}>Chat</Button></Link>
          <Link to='/profile'><Button sx={{ color: 'white' }}>Profile</Button></Link>
          <Button onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
