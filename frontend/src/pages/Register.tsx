import React from 'react'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import useRegisterUser, { type RegistrationValues } from '../hooks/user/useRegisterUser'

const Register = (): JSX.Element => {
  const { register, formState, handleSubmit, watch } = useForm<RegistrationValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { errors } = formState
  const { onSubmit, isLoading } = useRegisterUser()

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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Not a valid email'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name has to be at least 3 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password has to be at least 8 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              minLength: {
                value: 8,
                message: 'Confrim password has to be at least 8 characters'
              },
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match'
                }
              }
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link variant="body2">
                <RouterLink to='/login'>
                  {'Have an account? Login'}
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
