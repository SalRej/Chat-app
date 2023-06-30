import React, { useState } from 'react'
import UsersList from '../components/UsersList'
import Messages from '../components/Messages'
import { Stack } from '@mui/material'

const Chat = (): JSX.Element => {
  const [userToChat, setUserToChat] = useState({
    name: '',
    id: ''
  })

  return (
    <Stack direction='row'>
        <UsersList setUserToChat={setUserToChat}/>
        <Messages userToChat={userToChat} />
    </Stack>
  )
}

export default Chat
