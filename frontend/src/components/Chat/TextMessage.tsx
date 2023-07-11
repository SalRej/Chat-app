import { Box, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import type User from '../../interfaces/User'
import type Message from '../../interfaces/Message'

interface Props {
  userToChat: User | null
  index: number
  message: Message
}
const TextMessage = ({ userToChat, index, message }: Props): JSX.Element => {
  const isSender = message.senderId !== userToChat?.id
  console.log(message.text)
  return (
    <Box
        sx={{
          marginTop: index === 0 ? 'auto' : 'inherit',
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
            {message.text}
        </Typography>
    </Box>
  )
}

export default TextMessage
