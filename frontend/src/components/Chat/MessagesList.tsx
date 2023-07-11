import { Stack, Typography } from '@mui/material'
import React, { useRef, useEffect, useContext } from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'
import AuthContext from '../../context/AuthContext'
import ChatAvatar from './ChatAvatar'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../config/axiosInstance'

interface Props {
  messages: any[]
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
            <Typography textAlign="center">Say hi to {userToChat?.name}</Typography>
          )
        : (
            messages.map((message: any, index: number) => {
              const isSender = message.senderId !== userToChat?.id
              return (
                  <Stack
                    key={message.id}
                    direction={isSender ? 'row-reverse' : 'row'}
                    alignItems="center"
                    spacing={1}
                  >
                      <ChatAvatar user={user} userToChat={userToChat} isSender={isSender} />
                      { message.isImage &&
                        <FileMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                      {!message.isImage &&
                        <TextMessage
                          message={message}
                          userToChat={userToChat}
                          index={index}
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
