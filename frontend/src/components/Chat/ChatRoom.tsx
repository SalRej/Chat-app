import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import pusher from '../../config/pusher'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'
import type User from '../../interfaces/User'
import AuthContext from '../../context/AuthContext'
import type Message from '../../interfaces/Message'
import ChatHeader from './ChatHeader'

interface Props {
  userToChat: User | null
}
const ChatRoom = ({ userToChat }: Props): JSX.Element => {
  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState<Message[]>([])
  const [lastMessageId, setLastMessageId] = useState<string | null>(null)

  useQuery({
    queryFn: async ({ queryKey }) => {
      return await axiosInstance.get(`/message/${userToChat?.id as string}/${queryKey[2] as string}`)
    },
    onSuccess: (data: any) => {
      setMessages((prev: Message[]) => {
        return [...prev, ...data?.data]
      })
    },
    queryKey: [userToChat?.id, 'message', lastMessageId]
  })

  useEffect(() => {
    const channelName = [user?.id as string, userToChat?.id as string].sort().join('-')
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

    setMessages([])
  }, [userToChat?.id])

  useEffect(() => {
  }, [messages.length])

  const fetchMoreMessages = (): void => {
    // this triggers fetch
    setLastMessageId(messages[messages?.length - 1]?.id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        height: '100%'
      }}
    >
      <ChatHeader userToChat={userToChat} />
      <MessagesList userToChat={userToChat} messages={messages} fetchMoreMessages={fetchMoreMessages} />
      <ChatInput userToChat={userToChat}/>
    </Box>
  )
}

export default ChatRoom
