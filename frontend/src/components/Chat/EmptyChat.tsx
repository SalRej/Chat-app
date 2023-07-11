import { Stack, Typography } from '@mui/material'
import React from 'react'
import type User from '../../interfaces/User'

const EmptyChat = ({ userToChat }: { userToChat: User | null }): JSX.Element => {
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1} spacing={2}>
    <img
      src={userToChat?.profileImageUrl ? `http://localhost:5000/${userToChat?.profileImageUrl}` : 'default_user.png'}
      alt='user avatar'
      style={{ objectFit: 'cover', display: 'block', width: '30%', height: 'auto', borderRadius: '50%' }}>
    </img>
    <Typography variant='h3' textAlign="center">Say Hi to {userToChat?.name}</Typography>
  </Stack>
  )
}

export default EmptyChat
