import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import useTodo from '../hooks/useTodo'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { green } from '@mui/material/colors'
const TodoList = (): JSX.Element => {
  const {
    todos,
    updateTodo,
    deleteTodo,
    isLoading,
    isModifying,
    modifyingId
  } = useTodo()

  const onDeleteTodo = (id: string): void => {
    deleteTodo(id)
  }

  const onUpdateTodo = ({ id, done }: { id: string, done?: boolean }): void => {
    updateTodo({ id, done })
  }

  if (isLoading) {
    return <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  }

  return (
    <Grid container spacing={3} p={3}>
      {
        todos?.data.map((todo: any, index: number) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {
                (isModifying && todo.id === modifyingId)
                  ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  : <Card sx={{
                    backgroundColor: todo.done ? green[200] : 'white'
                  }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Todo
                  </Typography>
                  <Typography variant="h5" component="div">
                    {todo.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    something
                  </Typography>
                  <Typography variant="body2">
                    {todo.description}
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => { onDeleteTodo(todo.id) }} size="small" variant='contained'>Delete</Button>
                  <Button onClick={() => { onUpdateTodo({ id: todo.id }) }} size="small" variant='contained'>Update</Button>
                  <IconButton sx={{
                    border: 'solid 2px',
                    borderColor: green[400]
                  }} onClick={() => { onUpdateTodo({ id: todo.id, done: !todo.done }) }}>
                    <DownloadDoneIcon />
                  </IconButton>
                </CardActions>
              </Card>
              }
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default TodoList
