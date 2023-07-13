// Chat component
import React, { useEffect, useState } from 'react'
import UsersList, { type Users } from '../components/Chat/UsersList'
import { Grid, Stack } from '@mui/material'
import ChatRoom from '../components/Chat/ChatRoom'
import type User from '../interfaces/User'
import Header from '../components/Header'
import Pusher from 'pusher-js'
import ActiveUsersContext from '../context/ActiveUsersContext'
import axiosInstance from '../config/axiosInstance'

const Chat = (): JSX.Element => {
  const [userToChat, setUserToChat] = useState<User | null>(null)

  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [users, setUsers] = useState<Users[]>([])

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

    presenceChannel.bind('pusher:member_added', (member: any) => {
      setActiveUsers((prevUsers) => {
        if (activeUsers.includes(member.id)) {
          return prevUsers
        }
        return [...prevUsers, member.id]
      })
    })
    presenceChannel.bind('pusher:member_removed', (member: any) => {
      setActiveUsers((prevUsers) => {
        return prevUsers.filter((id) => id !== member.id)
      })

      void axiosInstance.post('/user/offline', { userId: member.id })
    })

    presenceChannel.bind('update_user_online_time', (newUser: User) => {
      setUsers((prevUsers: Users[]) => {
        const userToUpdateIndex = prevUsers.findIndex((user: Users) => user.id === newUser.id)
        if (userToUpdateIndex !== -1) {
          const newUsers = [...prevUsers]
          newUsers[userToUpdateIndex].lastOnline = newUser.lastOnline
          return newUsers
        }
        return prevUsers
      })
    })
  }, [])

  return (
    <ActiveUsersContext.Provider value={activeUsers}>
      <Stack sx={{ height: '100vh', width: '100%' }}>
        <Header />
        {!userToChat && <Grid item xs={12} flexGrow={1}>
            <UsersList setUserToChat={setUserToChat} setUsers={setUsers} users={users} />
          </Grid>
        }
        {userToChat &&
          <Grid container sx={{ height: '100%', flexGrow: 1 }}>
            <Grid item xs={5} md={3}>
              <UsersList setUserToChat={setUserToChat} setUsers={setUsers} users={users} />
            </Grid>
            <Grid item xs={7} md={9} sx={{ height: '100%' }}>
              <ChatRoom userToChat={userToChat}/>
            </Grid>
          </Grid>
        }
      </Stack>
    </ActiveUsersContext.Provider>
  )
}

export default Chat
