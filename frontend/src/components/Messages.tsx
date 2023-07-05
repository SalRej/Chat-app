import { Avatar, Box, Button, Chip, Fab, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import pusher from '../config/pusher'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
    },
    onSettled: () => {
      setTextMessage('')
    }
  })

  const { mutate: sendImageMessage } = useMutation({
    mutationFn: async (formData: any) => {
      await axiosInstance.post('/message/image', formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`,
          'Content-Type': 'multipart/form-data'
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

  function handleFileInputChange (event: any): void {
    event.preventDefault()
    const fileInput = event.target.files[0]

    const formData = new FormData()
    formData.append('image', fileInput)
    formData.append('recieverId', userToChat.id)

    sendImageMessage(formData)
  }

  const handleFabClick = (): void => {
    document.getElementById('fileInput')?.click()
  }

  return (
    <Box
        sx={{
          width: '100%',
          p: 3
        }}>
        <Stack spacing={2}>
            <Stack spacing={1} sx={{ height: '72vh', overflowY: 'scroll' }}>
                {
                    messages.length === 0
                      ? <Typography textAlign='center'>Say hi to {userToChat.name}</Typography>
                      : messages.map((message: any, index: number) => {
                        console.log(message)
                        if (message.isImage) {
                          return <img style={{ height: '100px', width: '100px' }} src={`http://localhost:5000/${message.text as string}`} key={message.id} alt='image'></img>
                        }
                        return (
                            <Chip
                                sx={{
                                  marginTop: index === 0 ? 'auto' : 'inherit',
                                  maxWidth: '50%',
                                  padding: '0.5em 0.4em',
                                  alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end',
                                  height: 'auto',
                                  '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal'
                                  }
                                }}
                                size="medium"
                                variant={message.senderId === userToChat.id ? 'outlined' : 'filled'}
                                color={'primary'}
                                key={message.id}
                                label={message.text}
                                avatar={<Avatar>{userToChat.name[0].toUpperCase()}</Avatar>}
                            />
                        )
                      })

                }
            </Stack>
            <Stack direction='row' sx={{ justifySelf: 'flex-end' }}>
                <Stack direction='row'>
                  <TextField value={textMessage} fullWidth size='small' type='text' onChange={updateTextMessage}></TextField>
                  <Button onClick={() => {
                    sendMessage({
                      textMessage,
                      recieverId: userToChat.id
                    })
                  }} variant='contained'>Send</Button>

                </Stack>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />

                  <label htmlFor="fileInput">
                    <Fab onClick={handleFabClick} color="primary" aria-label="add" size="small">
                      <CloudUploadIcon />
                    </Fab>
                  </label>
            </Stack>
        </Stack>
    </Box>
  )
}

export default Messages
