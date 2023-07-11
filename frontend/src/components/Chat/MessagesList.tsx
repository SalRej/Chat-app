import { Stack, Typography } from '@mui/material'
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
    <Stack spacing={2} sx={{ overflowY: 'scroll', flex: '1 1 0', pb: 2 }} ref={lastMessageRef}>
      { messages.length === 0
        ? (
            <Stack justifyContent="center" alignItems="center" flexGrow={1} spacing={2}>
              <img
                src={userToChat?.profileImageUrl ? `http://localhost:5000/${userToChat?.profileImageUrl}` : 'default_user.png'}
                alt='user avatar'
                style={{ objectFit: 'cover', display: 'block', width: '30%', height: 'auto', borderRadius: '50%' }}>
              </img>
              <Typography variant='h3' textAlign="center">Say Hi to {userToChat?.name}</Typography>
            </Stack>
          )
        : (
            messages.map((message: Message, index: number) => {
              const isSender = message.senderId !== userToChat?.id
              return (
                  <Stack
                    key={message.id}
                    direction={isSender ? 'row-reverse' : 'row'}
                    alignItems="center"
                    spacing={1}
                  >
                      <ChatAvatar user={user} userToChat={userToChat} isSender={isSender} />
                      {
                        message.isText &&
                        <TextMessage
                          message={message}
                          userToChat={userToChat}
                          index={index}
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
