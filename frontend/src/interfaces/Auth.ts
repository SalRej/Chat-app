import type User from './User'

interface Auth {
  isLoading: boolean
  user: User | null
  logIn: (user: User, token: string) => void
  logOut: () => void
}

export default Auth
