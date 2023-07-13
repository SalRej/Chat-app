import React, { useContext } from 'react'
import type User from '../../interfaces/User'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import UserItemAvatar from './UserItemAvatar'
import Loading from '../Loading'
import ActiveUsersContext from '../../context/ActiveUsersContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import VideocamIcon from '@mui/icons-material/Videocam'
import MoreVertIcon from '@mui/icons-material/MoreVert'
const ChatHeader = ({ userToChat }: { userToChat: User | null }): JSX.Element => {
  const activeUsers = useContext(ActiveUsersContext)

  if (!userToChat) {
    return <Loading />
  }

  return (
    <Box>
        <Box mb={1.4}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                  <UserItemAvatar user={userToChat} />
                  <Stack>
                      <Typography variant='h5'>{userToChat.name}</Typography>
                      <Typography fontSize={'15px'}>{activeUsers.includes(userToChat.id) ? 'Active now' : 'Not active'}</Typography>
                  </Stack>
                </Stack>
                <Box>
                  <IconButton color="primary">
                    <CameraAltIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <VideocamIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
            </Stack>
        </Box>
        <Divider />
    </Box>
  )
}

export default ChatHeader
