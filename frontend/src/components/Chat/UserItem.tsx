import { ListItemButton, ListItemIcon, Avatar, ListItemText, Typography, Divider, Stack } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React from 'react'

const UserItem = ({ user, changeChattingUser }: any): JSX.Element => {
  const lastSentMessageDate = new Date(user.sentMessages[0]?.createdAt ?? 0)
  const lastRecievedMessageDate = new Date(user.recievedMessages[0]?.createdAt ?? 0)

  const lastMessage = lastSentMessageDate > lastRecievedMessageDate ? user.sentMessages[0] : user.recievedMessages[0]
  return (
    <>
        <ListItemButton onClick={() => { changeChattingUser(user) }} key={user.id}>
            <ListItemIcon>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name[0].toUpperCase()}</Avatar>
            </ListItemIcon>
            <ListItemText primary={
                <Stack>
                    <Typography>{user.name}</Typography>
                    <Typography color={'GrayText'}>{lastMessage?.isImage ? 'File sent' : lastMessage?.text ?? 'No messages'}</Typography>
                </Stack>
            } />
        </ListItemButton>
        <Divider variant="middle" />
    </>
  )
}

export default UserItem
