import { Box, Link, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import type User from '../../interfaces/User'
import type Message from '../../interfaces/Message'
import isValidHttpUrl from '../../utilis/isValidHttpUrl'

interface Props {
  userToChat: User | null
  message: Message
}
const TextMessage = ({ userToChat, message }: Props): JSX.Element => {
  const isSender = message.senderId !== userToChat?.id
  return (
    <Box
        sx={{
          maxWidth: '50%',
          padding: '0.5em 0.4em',
          alignSelf: isSender ? 'flex-end' : 'flex-start',
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal'
          }
        }}
    >
        <Typography
          borderRadius={3}
          color={isSender ? 'white' : 'black'}
          px={2}
          py={1}
          bgcolor={isSender ? blue[500] : grey[200]}
        >
            {isValidHttpUrl(message.text) ? <Link target="_blank" href={message.text} sx={{ cursor: 'pointer', color: isSender ? 'white' : blue[500] }}>{message.text}</Link> : message.text}
        </Typography>
    </Box>
  )
}

export default TextMessage
