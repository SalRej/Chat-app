import { Stack, TextField, Button, Fab, Divider, Box } from '@mui/material'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const ChatInput = ({ textMessage, setTextMessage, sendMessage, sendImageMessage, userToChat }: any): JSX.Element => {
  const handleFabClick = (): void => {
    document.getElementById('fileInput')?.click()
  }

  const handleFileInputChange = (event: any): void => {
    event.preventDefault()
    const fileInput = event.target.files[0]

    const formData = new FormData()
    formData.append('image', fileInput)
    formData.append('recieverId', userToChat.id)

    sendImageMessage(formData)
  }

  const updateTextMessage = (event: any): void => {
    setTextMessage(event.target.value)
  }

  const onSubmit = (e: any): void => {
    e.preventDefault()
    sendMessage({
      textMessage,
      recieverId: userToChat.id
    })
  }

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
        <Divider variant="middle" />
        <Stack spacing={2} direction='row' sx={{ width: '100%', pt: 3 }}>
            <Stack direction='row' sx={{ width: '100%' }}>
                <TextField value={textMessage} fullWidth size='small' type='text' onChange={updateTextMessage}></TextField>
                <Button variant='contained'>Send</Button>
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
        </Stack>
    </Box>
  )
}

export default ChatInput
