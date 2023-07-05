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
              ? <img
                style={{
                  maxHeight: '300px',
                  maxWidth: '40%',
                  borderRadius: '12px',
                  alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end'
                }}
                src={`http://localhost:5000/${message.text as string}`}
                key={message.id} alt='image'>
            </img>
              : <a
                style={{
                  maxHeight: '300px',
                  maxWidth: '40%',
                  borderRadius: '12px',
                  alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end'
                }}
                href={`http://localhost:5000/${message.text as string}`}
                key={message.id}>
                <Button variant='outlined'>
                    <FileOpenIcon sx ={{ mr: 2 }}/>
                    Download file - {getExtension(message.text)}
                </Button>
            </a>
        }
    </>
  )
}

export default FileMessage
