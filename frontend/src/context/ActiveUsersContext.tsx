import { createContext } from 'react'

const ActiveUsersContext = createContext<string[]>([])

export default ActiveUsersContext
