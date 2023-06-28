import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
const ChatRoom = (): JSX.Element => {
  const navigate = useNavigate()
  const logout = (): void => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
        <Header />
        <TodoList />
        <Button variant='contained' onClick={logout}>Logout</Button>
    </div>
  )
}

export default ChatRoom
