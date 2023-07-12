import { Avatar, Stack } from '@mui/material'
import React, { useRef, useEffect, useContext } from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'
import AuthContext from '../../context/AuthContext'
import ChatAvatar from './ChatAvatar'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../config/axiosInstance'
import type Message from '../../interfaces/Message'
import IconMessage from './IconMessage'
import EmptyChat from './EmptyChat'

interface Props {
  messages: Message[]
  userToChat: User | null
}

const MessagesList = ({ messages, userToChat }: Props): JSX.Element => {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { user } = useContext(AuthContext)

  const { mutate: seeMessage } = useMutation({
    mutationFn: async ({ recieverId, messageId }: { recieverId: string, messageId: string }) => {
      return await axiosInstance.post('/message/seen', {
        recieverId,
        messageId
      })
    }
  })

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight
    }

    const lastMessage = messages[messages.length - 1]

    if (lastMessage && userToChat?.id && lastMessage.senderId !== user?.id) {
      seeMessage({ recieverId: userToChat?.id, messageId: lastMessage.id })
    }
  }, [messages.length, userToChat?.id])

  return (
    <Stack sx={{ overflowY: 'scroll', flex: '1 1 0', pb: 2 }} ref={lastMessageRef}>
      { messages.length === 0
        ? <EmptyChat userToChat={userToChat} />
        : (
            messages.map((message: Message, index: number) => {
              const isSender = message.senderId !== userToChat?.id
              const currentUserId = message.senderId === user?.id ? user?.id : userToChat?.id
              const nextUserIndex = index + 1 >= messages.length ? messages.length - 1 : index + 1
              const nextUser = messages[nextUserIndex].senderId === user?.id ? user?.id : userToChat?.id
              const isUserChanged = currentUserId !== nextUser
              return (
                  <Stack
                    key={message.id}
                    direction={isSender ? 'row-reverse' : 'row'}
                    alignItems="center"
                    spacing={1}
                    sx={{ marginTop: index === 0 ? 'auto' : 'inherit' }}
                  >
                      {isUserChanged || (index === messages.length - 1)
                        ? <ChatAvatar user={user} userToChat={userToChat} isSender={isSender} />
                        : <Avatar sx={{ bgcolor: 'transparent' }}></Avatar> }
                      {
                        message.isText &&
                        <TextMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                      {
                        message.isImage &&
                        <FileMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                      {
                        message.isIcon &&
                        <IconMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                  </Stack>
              )
            })
          )
      }
    </Stack>
  )
}

export default MessagesList
