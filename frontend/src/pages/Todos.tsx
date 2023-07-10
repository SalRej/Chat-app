import { Fab } from '@mui/material'
import React from 'react'
import TodoList from '../components/TodoList'
import useTodo from '../hooks/useTodo'
import AddIcon from '@mui/icons-material/Add'
import Header from '../components/Header'

const generateRandomString = (length: number): any => [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join('')

const Todos = (): JSX.Element => {
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
        <Fab sx={{ m: 2 }} onClick={onAddTodo} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <TodoList />
    </div>
  )
}

export default Todos
