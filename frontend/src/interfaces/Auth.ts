import { type Dispatch } from 'react'
import type User from './User'

interface Auth {
  isLoading: boolean
  user: User | null
  logIn: (user: User, token: string) => void
  logOut: () => void
  setUser: Dispatch<React.SetStateAction<User | null>>
}

export default Auth
