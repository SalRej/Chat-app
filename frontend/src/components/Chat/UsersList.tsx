import { useQuery } from '@tanstack/react-query'
import React, { type Dispatch, type SetStateAction } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import type User from '../../interfaces/User'

interface Props {
  setUserToChat: Dispatch<SetStateAction<User | null>>
}
const UsersList = ({ setUserToChat }: Props): JSX.Element => {
  const { data: users, isLoading } = useQuery({
    queryFn: async () => {
      return await axiosInstance.get('/users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    }
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  const changeChattingUser = (user: User): void => {
    setUserToChat({
      name: user.name,
      id: user.id,
      email: user.email
    })
  }

  return (
    <Paper elevation={4} sx={{ height: '100%' }}>
      <List>
        {users?.data.map((user: any) => (
          <ListItemButton onClick={() => { changeChattingUser(user) }} key={user.id}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}

export default UsersList
