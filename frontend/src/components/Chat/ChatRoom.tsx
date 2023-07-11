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
import Loading from '../Loading'

interface Props {
  userToChat: User | null
}
const ChatRoom = ({ userToChat }: Props): JSX.Element => {
  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState<Message[]>([])

  const { isLoading } = useQuery({
    queryFn: async () => {
      return await axiosInstance.get(`/message/${userToChat?.id as string}`)
    },
    onSuccess: (data) => {
      setMessages(data?.data ?? [])
    },
    queryKey: [userToChat?.id, 'message']
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

  if (isLoading) {
    return <Loading />
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
      <MessagesList userToChat={userToChat} messages={messages} />
      <ChatInput userToChat={userToChat}/>
    </Box>
  )
}

export default ChatRoom
