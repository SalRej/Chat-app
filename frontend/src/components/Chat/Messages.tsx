import { Box, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import pusher from '../../config/pusher'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'

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

  return (
    <Box
      sx={{
        width: '100%',
        p: 3
      }}>
      <Stack spacing={2}>
        <MessagesList userToChat={userToChat} messages={messages} />
        <ChatInput
          sendImageMessage={sendImageMessage}
          sendMessage={sendMessage}
          textMessage={textMessage}
          userToChat={userToChat}
          setTextMessage={setTextMessage}
        />
      </Stack>
    </Box>
  )
}

export default Messages
