import React, { useContext } from 'react'
import type User from '../../interfaces/User'
import { Box, Divider, Stack, Typography } from '@mui/material'
import UserItemAvatar from './UserItemAvatar'
import Loading from '../Loading'
import ActiveUsersContext from '../../context/ActiveUsersContext'

const ChatHeader = ({ userToChat }: { userToChat: User | null }): JSX.Element => {
  const activeUsers = useContext(ActiveUsersContext)

  if (!userToChat) {
    return <Loading />
  }

  return (
    <Box>
        <Box mb={1.4}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <UserItemAvatar user={userToChat} />
                <Stack>
                    <Typography variant='h5'>{userToChat.name}</Typography>
                    <Typography fontSize={'15px'}>{activeUsers.includes(userToChat.id) ? 'Active now' : 'Not active'}</Typography>
                </Stack>
            </Stack>
        </Box>
        <Divider />
    </Box>
  )
}

export default ChatHeader
