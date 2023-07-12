import { ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Stack } from '@mui/material'

import React from 'react'
import { type Users } from './UsersList'
import type User from '../../interfaces/User'
import icons from '../../constants/icons'
import UserItemAvatar from './UserItemAvatar'

interface Props {
  user: Users
  changeChattingUser: (user: User) => void
}
const UserItem = ({ user, changeChattingUser }: Props): JSX.Element => {
  const lastSentMessageDate = new Date(user.sentMessages[0]?.createdAt ?? 0)
  const lastRecievedMessageDate = new Date(user.recievedMessages[0]?.createdAt ?? 0)

  const lastMessage = lastSentMessageDate > lastRecievedMessageDate ? user.sentMessages[0] : user.recievedMessages[0]

  const options: Intl.DateTimeFormatOptions = ({ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
  const formater = new Intl.DateTimeFormat('en-US', options)
  const date = lastMessage ? formater.format(new Date(lastMessage.createdAt)) : ''

  const whoSendIt = lastMessage?.senderId === user.id ? user?.name : 'You'
  const isSeen = lastMessage?.isSeen && whoSendIt !== 'You'

  const IconComponent = icons[lastMessage?.text]?.component
  const IconProps = icons[lastMessage?.text]?.props

  return (
    <>
        <ListItemButton onClick={() => { changeChattingUser(user) }} key={user.id}>
            <ListItemIcon>
              <UserItemAvatar user={user}/>
            </ListItemIcon>
            <ListItemText primary={
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                    <Typography>{user.name}</Typography>
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1
                      }}
                      color={!isSeen && whoSendIt !== 'You' ? 'black' : 'GrayText'}
                      fontWeight={!isSeen && whoSendIt !== 'You' ? '600' : 'normal'}
                    >
                      <Stack direction="row" alignItems="center">
                        {whoSendIt}:
                        {lastMessage?.isImage && 'File sent' }
                        {lastMessage?.isIcon && <IconComponent {...IconProps} /> }
                        {lastMessage?.isText && lastMessage?.text}
                        {!lastMessage?.text ? 'No messages' : null}
                      </Stack>
                    </Typography>
                </Stack>
                <Stack justifyContent='space-between'>
                  <Typography fontSize={12} color={'GrayText'}>{date}</Typography>
                  {
                    (lastMessage?.isSeen && whoSendIt === 'You') && <Typography alignSelf="flex-end" fontSize={12} color="GrayText">Seen</Typography>
                  }
                </Stack>
              </Stack>
            } />
        </ListItemButton>
        <Divider variant="middle" />
    </>
  )
}

export default UserItem
