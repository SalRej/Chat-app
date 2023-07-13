import { Box } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import pusher from '../../config/pusher'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'
import AuthContext from '../../context/AuthContext'
import type Message from '../../interfaces/Message'
import ChatHeader from './ChatHeader'
import ChattingUserContext from '../../context/ChattingUserContext'

const ChatRoom = (): JSX.Element => {
  const { userToChat, setUserToChat } = useContext(ChattingUserContext)
  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState<Message[]>([])
  const [lastMessageId, setLastMessageId] = useState<string | null>(null)

  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      return
    }

    return () => {
      setUserToChat(null)
    }
  }, [])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    setMessages([])
    setLastMessageId(null)

    const channelName = [user?.id as string, userToChat?.id as string].sort().join('-')
    const channel = pusher.subscribe(channelName)

    channel.bind('message_sent', (data: any) => {
      const { message } = data
      console.log(message)
      setMessages((prev: Message[]) => {
        return [
          message,
          ...prev
        ]
      })
    })
    fetchMessages(null)

    return () => {
      pusher.unsubscribe(channelName)
    }
  }, [userToChat?.id])

  const fetchMessages = (lastMessageId: string | null): void => {
    axiosInstance.get(`/message/${userToChat?.id as string}/${lastMessageId as string}`)
      .then((res) => {
        setMessages((prev: Message[]) => {
          setLastMessageId(res?.data[res?.data.length - 1]?.id)
          return [...prev, ...res?.data]
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  const fetchMoreMessages = (): void => {
    fetchMessages(lastMessageId as string)
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
