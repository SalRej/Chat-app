import React, { useContext } from 'react'
import type User from '../../interfaces/User'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import ActiveUsersContext from '../../context/ActiveUsersContext'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
const UserItemAvatar = ({ user }: { user: User }): JSX.Element => {
  const activeUsers = useContext(ActiveUsersContext)

  const OnlineBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  const OfflineBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: 'grey',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        content: '""'
      }
    }
  }))

  const UserAvatar = user?.profileImageUrl
    ? <Avatar alt="Remy Sharp" src={`http://localhost:5000/${user?.profileImageUrl}`} />
    : <Avatar sx={{ bgcolor: blue[500] }}>{user.name[0].toUpperCase()}</Avatar>

  return (
    <>
        {
            activeUsers.includes(user.id)
              ? <OnlineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    { UserAvatar }
                </OnlineBadge>
              : <OfflineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    { UserAvatar }
                </OfflineBadge>
        }
    </>
  )
}

export default UserItemAvatar
