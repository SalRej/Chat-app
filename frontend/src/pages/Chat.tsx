// Chat component
import React, { useState } from 'react'
import UsersList from '../components/Chat/UsersList'
import { Grid, Stack } from '@mui/material'
import ChatRoom from '../components/Chat/ChatRoom'
import type User from '../interfaces/User'
import Header from '../components/Header'

const Chat = (): JSX.Element => {
  const [userToChat, setUserToChat] = useState<User | null>(null)

  return (
    <Stack sx={{ height: '100vh', width: '100%' }}>
      <Header />
      <Grid container sx={{ height: '100%', flexGrow: 1 }}>
        <Grid item xs={3}>
          <UsersList setUserToChat={setUserToChat}/>
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <ChatRoom userToChat={userToChat}/>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Chat
