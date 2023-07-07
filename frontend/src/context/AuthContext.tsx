import React, { createContext } from 'react'
import type Auth from '../interfaces/Auth'
import useAuth from '../hooks/useAuth'

const AuthContext = createContext<Auth>({
  isLoading: false,
  user: null,
  logIn: () => {},
  logOut: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { user, logIn, logOut, isLoading } = useAuth()
  return (
    <AuthContext.Provider value={{
      user, logIn, logOut, isLoading
    }}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
