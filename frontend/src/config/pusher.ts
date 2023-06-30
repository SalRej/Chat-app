import Pusher from 'pusher-js'

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY as string, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER as string
})

export default pusher
