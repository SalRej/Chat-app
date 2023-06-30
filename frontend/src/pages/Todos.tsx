import { Fab } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import useTodo from '../hooks/useTodo'
import AddIcon from '@mui/icons-material/Add'

const generateRandomString = (length: number): any => [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join('')

const ChatRoom = (): JSX.Element => {
  const { addTodo } = useTodo()

  const onAddTodo = (): void => {
    addTodo({
      name: generateRandomString(10),
      description: generateRandomString(50)
    })
  }
  return (
    <div>
        <Header />
        <Fab onClick={onAddTodo} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <TodoList />
    </div>
  )
}

export default ChatRoom
