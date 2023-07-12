// Chat component
import React, { useEffect, useState } from 'react'
import UsersList from '../components/Chat/UsersList'
import { Grid, Stack } from '@mui/material'
import ChatRoom from '../components/Chat/ChatRoom'
import type User from '../interfaces/User'
import Header from '../components/Header'
import Pusher from 'pusher-js'
import ActiveUsersContext from '../context/ActiveUsersContext'

const Chat = (): JSX.Element => {
  const [userToChat, setUserToChat] = useState<User | null>(null)

  const [activeUsers, setActiveUsers] = useState<string[]>([])

  useEffect(() => {
    // new pusher instance, becouse on login the header with token does not update and it is null
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY as string, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
      authEndpoint: 'http://localhost:5000/pusher/auth',
      auth: {
        headers: { authorization: `Bearer ${localStorage.getItem('token') as string}` }
      }
    })
    const presenceChannel: any = pusher.subscribe('presence-users')

    presenceChannel.bind('pusher:subscription_succeeded', (members: any) => {
      setActiveUsers(Object.keys(members.members))
    })

    presenceChannel.bind('pusher:member_added', function (member: any) {
      setActiveUsers((prevUsers) => {
        if (activeUsers.includes(member.id)) {
          return prevUsers
        }
        return [...prevUsers, member.id]
      })
    })
    presenceChannel.bind('pusher:member_removed', function (member: any) {
      setActiveUsers((prevUsers) => {
        return prevUsers.filter((id) => id !== member.id)
      })
    })
  }, [])

  return (
    <ActiveUsersContext.Provider value={activeUsers}>
      <Stack sx={{ height: '100vh', width: '100%' }}>
        <Header />
        <Grid container sx={{ height: '100%', flexGrow: 1 }}>
          <Grid item xs={5} md={3}>
            <UsersList setUserToChat={setUserToChat}/>
          </Grid>
          <Grid item xs={7} md={9} sx={{ height: '100%' }}>
            <ChatRoom userToChat={userToChat}/>
          </Grid>
        </Grid>
      </Stack>
    </ActiveUsersContext.Provider>
  )
}

export default Chat
