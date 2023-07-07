import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type User from '../interfaces/User'
import axiosInstance from '../config/axiosInstance'
import type Auth from '../interfaces/Auth'

const useAuth = (): Auth => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  const logIn = (user: User, token: string): void => {
    setUser(user)
    localStorage.setItem('token', token)
  }

  const logOut = (): void => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    axiosInstance.get('/user')
      .then((data) => {
        setUser(data.data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    user, logIn, logOut, isLoading
  }
}

export default useAuth
