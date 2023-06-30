import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { blue } from '@mui/material/colors'
import pusher from '../config/pusher'

const Messages = ({ userToChat }: any): JSX.Element => {
  const [textMessage, setTextMessage] = useState('')

  const [messages, setMessages] = useState<any>([])

  useQuery({
    queryFn: async () => {
      return await axiosInstance.get(`/message/${userToChat.id as string}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    },
    onSuccess: (data) => {
      setMessages(data?.data ?? [])
    },
    queryKey: [userToChat.id, 'message']
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    const channelName = [user.id, userToChat.id].sort().join('-')
    const channel = pusher.subscribe(channelName)

    channel.bind('message_sent', (data: any) => {
      const { message } = data
      console.log(message)
      setMessages((prev: any) => {
        return [
          ...prev,
          message
        ]
      })
    })
  }, [userToChat])
  const updateTextMessage = (event: any): void => {
    setTextMessage(event.target.value)
  }

  return (
    <Box sx={{ width: '100%' }}>
        <Stack spacing={1}>
            {
                messages.length === 0
                  ? <Typography>Say hi to {userToChat.name}</Typography>
                  : messages.map((message: any) => {
                    return (
                        <Chip
                            sx={{
                              maxWidth: '50%',
                              alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end',
                              backgroundColor: message.senderId === userToChat.id ? blue[100] : blue[400]
                            }}
                            key={message.id}
                            label={message.text}
                        />
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
