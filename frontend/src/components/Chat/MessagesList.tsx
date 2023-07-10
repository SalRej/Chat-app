import { Stack, Typography } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'

interface Props {
  messages: any[]
  userToChat: User | null
}

const MessagesList = ({ messages, userToChat }: Props): JSX.Element => {
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight
    }
  }, [messages.length, userToChat])

  return (
    <Stack spacing={2} sx={{ overflowY: 'scroll', flex: '1 1 0', pb: 2 }} ref={lastMessageRef}>
      {messages.length === 0
        ? (
        <Typography textAlign="center">Say hi to {userToChat?.name}</Typography>
          )
        : (
            messages.map((message: any, index: number) => {
              if (message.isImage) {
                return (
                <FileMessage
                  key={message.id}
                  message={message}
                  userToChat={userToChat}
                />)
              }
              return (
                <TextMessage
                  key={message.id}
                  message={message}
                  userToChat={userToChat}
                  index={index}
                />
              )
            })
          )}
    </Stack>
  )
}

export default MessagesList
