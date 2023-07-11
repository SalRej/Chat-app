import { Stack, TextField, Button, Fab, Divider, Box } from '@mui/material'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type User from '../../interfaces/User'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import useSendMessage from '../../hooks/useSendMessage'
interface Props {
  userToChat: User | null
}
const ChatInput = ({ userToChat }: Props): JSX.Element => {
  const { sendImageMessage, sendMessage, setTextMessage, textMessage, sendIconMessage } = useSendMessage()

  const handleFabClick = (): void => {
    document.getElementById('fileInput')?.click()
  }

  const handleFileInputChange = (event: any): void => {
    event.preventDefault()
    const fileInput = event.target.files[0]

    const formData = new FormData()

    if (userToChat) {
      formData.append('image', fileInput)
      formData.append('recieverId', userToChat.id)
      sendImageMessage(formData)
    }
  }

  const updateTextMessage = (event: any): void => {
    setTextMessage(event.target.value)
  }

  const onSubmit = (e: any): void => {
    e.preventDefault()
    if (userToChat) {
      sendMessage({
        textMessage,
        recieverId: userToChat.id
      })
    }
  }

  const handleIconMessageClick = (): void => {
    if (!userToChat?.id) {
      return
    }

    sendIconMessage({
      textMessage: 'thumbUp',
      recieverId: userToChat?.id
    })
  }

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
        <Divider variant="middle" />
        <Stack spacing={2} direction='row' sx={{ width: '100%', pt: 3 }}>
            <Stack direction='row' sx={{ width: '100%' }}>
                <TextField
                  value={textMessage}
                  fullWidth size='small'
                  type='text'
                  onChange={updateTextMessage}
                ></TextField>
                <Button variant='contained' sx={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>Send</Button>
            </Stack>
            <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />

            <label htmlFor="fileInput">
                <Fab onClick={handleFabClick} color="primary" aria-label="add" size="small">
                    <CloudUploadIcon />
                </Fab>
            </label>
            <label>
              <Fab onClick={handleIconMessageClick} color="primary" size="small">
                <ThumbUpIcon />
              </Fab>
            </label>
        </Stack>
    </Box>
  )
}

export default ChatInput
