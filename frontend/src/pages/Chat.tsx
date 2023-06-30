import Pusher from 'pusher-js'
import React, { useEffect } from 'react'

const Chat = (): JSX.Element => {
  useEffect(() => {
    Pusher.logToConsole = true

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY as string, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER as string
    })

    const channel = pusher.subscribe('test')

    channel.bind('some_event', () => { console.log('raboti') })
  }, [])

  return (
    <div>Chat</div>
  )
}

export default Chat
