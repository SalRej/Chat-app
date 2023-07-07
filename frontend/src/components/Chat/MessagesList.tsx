import { Stack, Typography } from '@mui/material'
import React from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'

interface Props {
  messages: any[]
  userToChat: User | null
}
const MessagesList = ({ messages, userToChat }: Props): JSX.Element => {
  return (
    <Stack spacing={1} sx={{ overflowY: 'scroll', flexGrow: 1 }}>
    {
        messages.length === 0
          ? <Typography textAlign='center'>Say hi to {userToChat?.name}</Typography>
          : messages.map((message: any, index: number) => {
            if (message.isImage) {
              return <FileMessage key={message.id} message={message} userToChat={userToChat}/>
            }
            return (
                <TextMessage key={message.id} message={message} userToChat={userToChat} index={index} />
            )
          })

    }
    </Stack>
  )
}

export default MessagesList
