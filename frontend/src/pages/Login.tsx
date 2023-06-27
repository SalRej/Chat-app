import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import React from 'react'
import axiosInstance from '../axiosInstance'

const Login = (): JSX .Element => {
  const navigate = useNavigate()
  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    axiosInstance.post('/login', {
      email: data.get('email'),
      password: data.get('password')
    }).then((data: any) => {
      localStorage.setItem('token', data.data.token)
      navigate('/chat')
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
                <RouterLink to='/register'>
                    <Link variant="body2">
                        {"Don't have an account? Register"}
                    </Link>
                </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
