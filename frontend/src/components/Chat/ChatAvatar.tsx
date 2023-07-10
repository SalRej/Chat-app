import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const ChatAvatar = ({ user, userToChat, isSender }: any): JSX.Element => {
  if (isSender) {
    return (
    <React.Fragment>
        {
            user?.profileImageUrl
              ? <Avatar src={`http://localhost:5000/${user?.profileImageUrl as string}`}/>
              : <Avatar sx={{ bgcolor: blue[500] }}>{user?.name[0].toUpperCase()}</Avatar>
        }
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>
    {
        userToChat?.profileImageUrl
          ? <Avatar src={`http://localhost:5000/${userToChat?.profileImageUrl as string}`}/>
          : <Avatar sx={{ bgcolor: blue[500] }}>{userToChat?.name[0].toUpperCase()}</Avatar>
    }
    </React.Fragment>
  )
}

export default ChatAvatar
