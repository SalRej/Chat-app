import { useQuery } from '@tanstack/react-query'
import React, { type Dispatch, type SetStateAction } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { List, Paper } from '@mui/material'
import type User from '../../interfaces/User'
import UserItem from './UserItem'

interface Props {
  setUserToChat: Dispatch<SetStateAction<User | null>>
}

const UsersList = ({ setUserToChat }: Props): JSX.Element => {
  const { data: users, isLoading } = useQuery({
    queryFn: async () => {
      return await axiosInstance.get('/users')
    }
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  const changeChattingUser = (user: User): void => {
    setUserToChat(user)
  }

  return (
    <Paper elevation={4} sx={{ height: '100%' }}>
      <List>
        {users?.data.map((user: any) => (
          <UserItem key={user.id} user={user} changeChattingUser={changeChattingUser}/>
        ))}
      </List>
    </Paper>
  )
}

export default UsersList
