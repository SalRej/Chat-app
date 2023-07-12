import React from 'react'
import type User from '../../interfaces/User'
import { Box, Divider, Stack, Typography } from '@mui/material'
import UserItemAvatar from './UserItemAvatar'
import Loading from '../Loading'

const ChatHeader = ({ userToChat }: { userToChat: User | null }): JSX.Element => {
  if (!userToChat) {
    return <Loading />
  }

  return (
    <Box>
        <Box mb={1.4}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <UserItemAvatar user={userToChat} />
                <Typography variant='h5'>{userToChat.name}</Typography>
            </Stack>
        </Box>
        <Divider />
    </Box>
  )
}

export default ChatHeader
