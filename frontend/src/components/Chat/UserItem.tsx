import { ListItemButton, ListItemIcon, Avatar, ListItemText, Typography, Divider, Stack } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const UserItem = ({ user, changeChattingUser }: any): JSX.Element => {
  const lastSentMessageDate = new Date(user.sentMessages[0]?.createdAt ?? 0)
  const lastRecievedMessageDate = new Date(user.recievedMessages[0]?.createdAt ?? 0)

  const lastMessage = lastSentMessageDate > lastRecievedMessageDate ? user.sentMessages[0] : user.recievedMessages[0]

  const options: Intl.DateTimeFormatOptions = ({ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
  const formater = new Intl.DateTimeFormat('en-US', options)
  const date = lastMessage ? formater.format(new Date(lastMessage.createdAt)) : ''

  const whoSendIt = lastMessage?.senderId === user.id ? user?.name : 'You'
  console.log(lastMessage)
  return (
    <>
        <ListItemButton onClick={() => { changeChattingUser(user) }} key={user.id}>
            <ListItemIcon>
              {
                user?.profileImageUrl
                  ? <Avatar alt="Remy Sharp" src={`http://localhost:5000/${user?.profileImageUrl as string}`} />
                  : <Avatar sx={{ bgcolor: blue[500] }}>{user.name[0].toUpperCase()}</Avatar>
              }
            </ListItemIcon>
            <ListItemText primary={
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                    <Typography>{user.name}</Typography>
                    <Typography sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1
                    }} color={'GrayText'}>{whoSendIt}: {lastMessage?.isImage ? 'File sent' : lastMessage?.text ?? 'No messages'}</Typography>
                </Stack>
                <Typography fontSize={12} color={'GrayText'}>{date}</Typography>
              </Stack>
            } />
        </ListItemButton>
        <Divider variant="middle" />
    </>
  )
}

export default UserItem
