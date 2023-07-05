import { Avatar, Chip } from '@mui/material'
import React from 'react'

const TextMessage = ({ userToChat, index, message }: any): JSX.Element => {
  return (
    <Chip
        sx={{
          marginTop: index === 0 ? 'auto' : 'inherit',
          maxWidth: '50%',
          padding: '0.5em 0.4em',
          alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end',
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal'
          }
        }}
        size="medium"
        variant={message.senderId === userToChat.id ? 'outlined' : 'filled'}
        color={'primary'}
        key={message.id}
        label={message.text}
        avatar={<Avatar>{userToChat.name[0].toUpperCase()}</Avatar>}
    />
  )
}

export default TextMessage
