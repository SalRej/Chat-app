import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const ChatAvatar = ({ user, userToChat, isSender }: any): JSX.Element => {
  const currentUser = isSender ? user : userToChat
  return (
    <React.Fragment>
      {
          currentUser?.profileImageUrl
            ? <Avatar src={`http://localhost:5000/${currentUser?.profileImageUrl as string}`} sx={{ alignSelf: 'flex-end', mb: 1 }}/>
            : <Avatar sx={{ bgcolor: blue[500], alignSelf: 'flex-end' }}>{currentUser.name[0].toUpperCase()}</Avatar>
      }
    </React.Fragment>
  )
}

export default ChatAvatar
