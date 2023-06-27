import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    axiosInstance.post('/user', {
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirm-password'),
      name: data.get('name')
    }).then((data: any) => {
      console.log(data.data.token)
      localStorage.setItem('token', data.data.token)
      navigate('/chat')
    }).catch(e => {
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
          Register
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
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
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
           <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
                <RouterLink to='/login'>
                    <Link href="#" variant="body2">
                        {'Have an account? Login'}
                    </Link>
                </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
