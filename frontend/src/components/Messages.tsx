import { Box } from '@mui/material'
import React from 'react'

const Messages = ({ userToChat }: any): JSX.Element => {
  return (
    <Box>{userToChat.name}</Box>
  )
}

export default Messages
