import React, { useContext } from 'react'
import Header from '../components/Header'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { grey } from '@mui/material/colors'
import useUpdateUser, { type UpdateUserData } from '../hooks/user/useUpdateUser'
const Profile = (): JSX.Element => {
  const { user } = useContext(AuthContext)
  const { register, formState, handleSubmit } = useForm<UpdateUserData>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      password: '',
      confirmPassword: ''
    }
  })

  const { errors } = formState

  const { onSubmit, handleFileInputChange } = useUpdateUser()

  const handleFileUploadClick = (): void => {
    document.getElementById('fileInput')?.click()
  }

  const porfileImageUrl = user?.profileImageUrl ? `http://localhost:5000/${user?.profileImageUrl}` : '/default_user.png'
  return (
    <div>
        <Header />
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: '70%', margin: 'auto', mt: 7, height: '70vh' }} spacing={12}>
            <Box sx={{ width: '50%' }}>
              <Box
                  sx={{
                    width: '200px',
                    height: '200px',
                    position: 'relative',
                    margin: 'auto'
                  }}
              >
                  <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                  />

                  <IconButton onClick={handleFileUploadClick} sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: grey[400] }}>
                      <CameraAltIcon />
                  </IconButton>

                  <img style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }} src={porfileImageUrl}></img>
                  <Typography textAlign="center" variant='h5' mt={2}>{user?.name}</Typography>
              </Box>
            </Box>
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%'
                }}
            >
                <Typography component="h1" variant="h5">
                    Update Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
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
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
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
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword', {
                      minLength: {
                        value: 8,
                        message: 'Confrim password has to be at least 8 characters'
                      }
                      // validate: (val: string) => {
                      //   if (watch('password') !== val) {
                      //     return 'Your passwords do no match'
                      //   }
                      // }
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={false}
                >
                    Update
                </LoadingButton>
                </Box>
            </Box>
        </Stack>
    </div>
  )
}

export default Profile
