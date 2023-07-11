import { useQuery } from '@tanstack/react-query'
import React, { useEffect, type Dispatch, type SetStateAction, useContext, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { List, Paper } from '@mui/material'
import type User from '../../interfaces/User'
import UserItem from './UserItem'
import pusher from '../../config/pusher'
import AuthContext from '../../context/AuthContext'
import type Message from '../../interfaces/Message'
interface Props {
  setUserToChat: Dispatch<SetStateAction<User | null>>
}

export interface Users extends User {
  recievedMessages: Message[]
  sentMessages: Message[]
}
const UsersList = ({ setUserToChat }: Props): JSX.Element => {
  const { user } = useContext(AuthContext)

  const [users, setUsers] = useState<Users[]>([])

  const { isLoading } = useQuery(['users'], {
    queryFn: async () => {
      return await axiosInstance.get('/users')
    },
    onSuccess: (data) => {
      setUsers(data?.data)
    }
  })

  useEffect(() => {
    const channelName = `messages-${user?.id as string}`
    const channel = pusher.subscribe(channelName)

    channel.bind('message_seen', (data: { message: Message, recieverId: string }) => {
      const { message, recieverId } = data
      setUsers((prevUsers: Users[]) => {
        const indexToUpdate = prevUsers.findIndex((user: User) => user?.id === recieverId)
        if (indexToUpdate !== -1) {
          const newUsers = [...prevUsers]
          newUsers[indexToUpdate].sentMessages[0] = message
          return newUsers
        }
        return prevUsers
      })
    })

    channel.bind('message_recieved', (data: { message: Message, senderId: string }) => {
      const { message, senderId } = data
      setUsers((prevUsers: Users[]) => {
        const indexToUpdate = prevUsers.findIndex((user: User) => user?.id === senderId)
        if (indexToUpdate !== -1) {
          const newUsers = [...prevUsers]
          newUsers[indexToUpdate].sentMessages[0] = message
          return newUsers
        }
        return prevUsers
      })
    })
  }, [])

  if (isLoading) {
    return <p>Loading</p>
  }

  const changeChattingUser = (user: User, id: string): void => {
    setUserToChat(user)
  }

  return (
    <Paper elevation={4} sx={{ height: '100%' }}>
      <List>
        {users?.map((user: Users) => (
          <UserItem key={user.id} user={user} changeChattingUser={changeChattingUser}/>
        ))}
      </List>
    </Paper>
  )
}

export default UsersList
