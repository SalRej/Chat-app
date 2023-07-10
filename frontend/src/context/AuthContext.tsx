import React, { createContext } from 'react'
import type Auth from '../interfaces/Auth'
import useAuth from '../hooks/useAuth'

const AuthContext = createContext<Auth>({
  isLoading: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
  setUser: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { user, logIn, logOut, isLoading, setUser } = useAuth()
  return (
    <AuthContext.Provider value={{
      user, logIn, logOut, isLoading, setUser
    }}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
