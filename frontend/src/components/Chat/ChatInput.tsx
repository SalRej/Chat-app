import { Stack, TextField, Button, Fab, Divider, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type User from '../../interfaces/User'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import useSendMessage from '../../hooks/useSendMessage'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import IconsHolder from './IconsHolder'
interface Props {
  userToChat: User | null
}
const ChatInput = ({ userToChat }: Props): JSX.Element => {
  const { sendImageMessage, sendMessage, setTextMessage, textMessage, sendIconMessage } = useSendMessage()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpenIconsClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const [open, setOpen] = useState(Boolean(anchorEl))

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

  const handleIconMessageClick = (iconName: string): void => {
    if (!userToChat?.id) {
      return
    }

    sendIconMessage({
      textMessage: iconName,
      recieverId: userToChat?.id
    })
  }

  useEffect(() => {
    if (anchorEl) {
      setOpen(true)
    } else (setOpen(false))
  }, [anchorEl])

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
        <Divider variant="middle" />
        <Stack spacing={2} direction='row' sx={{ width: '100%', pt: 3 }}>
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
              <Fab onClick={handleOpenIconsClick} color="primary" size="small">
                <InsertEmoticonIcon />
              </Fab>
            </label>
            <Stack direction='row' sx={{ width: '100%' }}>
                <TextField
                  value={textMessage}
                  fullWidth size='small'
                  type='text'
                  onChange={updateTextMessage}
                ></TextField>
                <Button variant='contained' sx={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>Send</Button>
            </Stack>
            <label>
              <Fab onClick={() => { handleIconMessageClick('ThumbUpIcon') }} color="primary" size="small">
                <ThumbUpIcon />
              </Fab>
            </label>
            <IconsHolder
              open={open}
              setOpen={setOpen}
              anchorEl={anchorEl}
              handleIconMessageClick={handleIconMessageClick}
           />
        </Stack>
    </Box>
  )
}

export default ChatInput
