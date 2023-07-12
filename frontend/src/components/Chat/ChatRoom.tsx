import { Box } from '@mui/material'
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

  useEffect(() => {
    setMessages([])
    setLastMessageId(null)

    const channelName = [user?.id as string, userToChat?.id as string].sort().join('-')
    const channel = pusher.subscribe(channelName)

    channel.bind('message_sent', (data: any) => {
      const { message } = data
      setMessages((prev: Message[]) => {
        return [
          message,
          ...prev
        ]
      })
    })

    return () => {
      pusher.unsubscribe(channelName)
    }
  }, [userToChat?.id])

  useEffect(() => {
    axiosInstance.get(`/message/${userToChat?.id as string}/${lastMessageId as string}`)
      .then((res) => {
        setMessages((prev: Message[]) => {
          return [...prev, ...res?.data]
        })
      }).catch((e) => {
        console.log(e)
      })
  }, [lastMessageId, userToChat?.id])

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
