import React from 'react'
import type Message from '../../interfaces/Message'
import type User from '../../interfaces/User'
import icons from '../../constants/icons'
import { Box } from '@mui/material'

interface Props {
  message: Message
  userToChat: User | null
}

const IconMessage = ({ message, userToChat }: Props): JSX.Element => {
  const iconToRender = icons[message.text]
  const iconProps = icons[message.text].props
  return (
    <>
      <Box>
        {iconToRender && <iconToRender.component color="primary" fontSize="large" {...iconProps}/>}
      </Box>
    </>
  )
}

export default IconMessage
