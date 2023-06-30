import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../axiosInstance'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'

const UsersList = ({ setUserToChat }: any): JSX.Element => {
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

  const changeChattingUser = (user: any): void => {
    setUserToChat({
      name: user.name,
      id: user.id
    })
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
            {
                users?.data.map((user: any) => {
                  return (
                    <ListItemButton onClick={() => { changeChattingUser(user) }} key={user.id}>
                        <ListItemText primary={user.name}></ListItemText>
                    </ListItemButton>
                  )
                })
            }
        </List>
    </Box>
  )
}

export default UsersList
