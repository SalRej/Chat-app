import { Avatar, Stack, Typography } from '@mui/material'
import React, { useRef, useEffect, useContext } from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'
import { blue } from '@mui/material/colors'
import AuthContext from '../../context/AuthContext'

interface Props {
  messages: any[]
  userToChat: User | null
}

const MessagesList = ({ messages, userToChat }: Props): JSX.Element => {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight
    }
  }, [messages.length, userToChat])

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
                    <Avatar sx={{ bgcolor: blue[500] }}>{isSender ? user?.name[0].toUpperCase() : userToChat?.name[0].toUpperCase()}</Avatar>
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
