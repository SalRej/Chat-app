import Pusher from 'pusher-js'

// Pusher.logToConsole = true
const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY as string, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
  authEndpoint: 'http://localhost:5000/pusher/auth',
  auth: {
    headers: { authorization: `Bearer ${localStorage.getItem('token') as string}` }
  }
})

export default pusher
