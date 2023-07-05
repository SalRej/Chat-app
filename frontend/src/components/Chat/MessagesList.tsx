import { Stack, Typography } from '@mui/material'
import React from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'

const MessagesList = ({ messages, userToChat }: any): JSX.Element => {
  return (
    <Stack spacing={1} sx={{ height: '72vh', overflowY: 'scroll' }}>
    {
        messages.length === 0
          ? <Typography textAlign='center'>Say hi to {userToChat.name}</Typography>
          : messages.map((message: any, index: number) => {
            console.log(message)
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
