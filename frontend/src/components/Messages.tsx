import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { blue } from '@mui/material/colors'

const Messages = ({ userToChat }: any): JSX.Element => {
  const [textMessage, setTextMessage] = useState('')

  const token = localStorage.getItem('token')
  const { data: messages } = useQuery({
    queryFn: async () => {
      return await axiosInstance.get(`/message/${userToChat.id as string}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    },
    queryKey: ['message', userToChat.id, token]
  })

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => {
      return await axiosInstance.post('/message', {
        messageText: textMessage,
        recieverId
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    }
  })
  const updateTextMessage = (event: any): void => {
    setTextMessage(event.target.value)
  }

  return (
    <Box sx={{ width: '100%' }}>
        <Stack spacing={1}>
            {
                messages?.data.length === 0
                  ? <Typography>Say hi to {userToChat.name}</Typography>
                  : messages?.data.map((message: any) => {
                    return (
                        <Chip
                            sx={{
                              maxWidth: '50%',
                              alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end',
                              backgroundColor: message.senderId === userToChat.id ? blue[100] : blue[400]
                            }} key={message.id} label={message.text}/>
                    )
                  })

            }
        </Stack>
        <TextField type='text' onChange={updateTextMessage}></TextField>
        <Button onClick={() => {
          sendMessage({
            textMessage,
            recieverId: userToChat.id
          })
        }} variant='contained'>Send</Button>
    </Box>
  )
}

export default Messages
