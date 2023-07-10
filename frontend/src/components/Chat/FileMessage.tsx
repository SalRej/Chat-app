import { Button } from '@mui/material'
import React from 'react'
import FileOpenIcon from '@mui/icons-material/FileOpen'

const FileMessage = ({ message, userToChat }: any): JSX.Element => {
  const imageExtentions = ['png', 'jpg', 'gif', 'webp']
  const getExtension = (filename: string): string => {
    const parts = filename.split('.')
    if (parts.length === 1) {
      return '' // No extension found
    }
    return parts[parts.length - 1].toLowerCase()
  }

  return (
    <>
      {
        imageExtentions.includes(getExtension(message.text))
          ? <a style={{
            alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end',
            display: 'block',
            height: '300px',
            maxWidth: '30%'
          }} href={`http://localhost:5000/${message.text as string}`} target='_blank' rel="noreferrer">
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
                loading='lazy'
                src={`http://localhost:5000/${message.text as string}`}
                key={message.id} alt='image'>
              </img>
          </a>
          : <a
                style={{
                  maxHeight: '300px',
                  maxWidth: '40%',
                  borderRadius: '12px',
                  alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end'
                }}
                href={`http://localhost:5000/${message.text as string}`}
                key={message.id}>
                <Button variant='outlined' sx={{ borderRadius: '20px' }}>
                    Download file .{getExtension(message.text)}
                    <FileOpenIcon sx ={{ ml: 2 }}/>
                </Button>
            </a>
      }
    </>
  )
}

export default FileMessage
