import { createContext } from 'react'
import type User from '../interfaces/User'

interface ContextData {
  userToChat: User | null
  setUserToChat: React.Dispatch<React.SetStateAction<User | null>>
}
const ChattingUserContext = createContext<ContextData>({
  userToChat: null,
  setUserToChat: () => {}
})

export default ChattingUserContext
