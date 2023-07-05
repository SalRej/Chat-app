import React from 'react'

const ImageMessage = ({ message, userToChat }: any): JSX.Element => {
  return (
    <img
        style={{
          maxHeight: '300px',
          maxWidth: '40%',
          borderRadius: '12px',
          alignSelf: message.senderId === userToChat.id ? 'flex-start' : 'flex-end'
        }}
        src={`http://localhost:5000/${message.text as string}`}
        key={message.id} alt='image'>
    </img>
  )
}

export default ImageMessage
