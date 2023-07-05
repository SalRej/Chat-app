import React, { useState } from 'react'
import UsersList from '../components/UsersList'
import Messages from '../components/Messages'
import { Box, Stack } from '@mui/material'
import Header from '../components/Header'

const Chat = (): JSX.Element => {
  const [userToChat, setUserToChat] = useState({
    name: '',
    id: ''
  })

  return (
    <Box sx={{ height: '100vh' }}>
        <Header />
        <Stack direction='row' alignContent="stretch">
            <UsersList setUserToChat={setUserToChat}/>
            <Messages userToChat={userToChat} />
        </Stack>
    </Box>
  )
}

export default Chat
