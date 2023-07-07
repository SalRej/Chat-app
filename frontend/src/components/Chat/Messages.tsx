import { Box } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import pusher from '../../config/pusher'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'
import type User from '../../interfaces/User'
import AuthContext from '../../context/AuthContext'

interface Props {
  userToChat: User | null
}
const Messages = ({ userToChat }: Props): JSX.Element => {
  const { user } = useContext(AuthContext)
  const [textMessage, setTextMessage] = useState('')
  const [messages, setMessages] = useState<any>([])

  useQuery({
    queryFn: async () => {
      return await axiosInstance.get(`/message/${userToChat?.id as string}`)
    },
    onSuccess: (data) => {
      setMessages(data?.data ?? [])
    },
    queryKey: [userToChat?.id, 'message']
  })

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => {
      return await axiosInstance.post('/message', {
        messageText: textMessage,
        recieverId
      })
    },
    onSettled: () => {
      setTextMessage('')
    }
  })

  const { mutate: sendImageMessage } = useMutation({
    mutationFn: async (formData: any) => {
      await axiosInstance.post('/message/image', formData)
    }
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    const channelName = [user?.id, userToChat?.id].sort().join('-')
    const channel = pusher.subscribe(channelName)

    channel.bind('message_sent', (data: any) => {
      const { message } = data
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
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        height: '100%'
      }}
    >
      <MessagesList userToChat={userToChat} messages={messages} />
      <ChatInput
        sendImageMessage={sendImageMessage}
        sendMessage={sendMessage}
        textMessage={textMessage}
        userToChat={userToChat}
        setTextMessage={setTextMessage}
      />
    </Box>
  )
}

export default Messages
