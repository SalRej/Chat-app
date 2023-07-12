import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from '../config/axiosInstance'
import { useState } from 'react'

const useTodo = (): {
  todos: any
  updateTodo: any
  deleteTodo: any
  addTodo: any
  isLoading: boolean
  isModifying: boolean
  modifyingId: string
} => {
  const queryClient = useQueryClient()

  const [modifyingId, setModifyingId] = useState('')
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      return await axiosInstance.get('/todo', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    }
  })

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id: string) => {
      return await axiosInstance.delete('/todo/' + id, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    },
    onMutate: async (newTodo: any) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData(['todos'])

      queryClient.setQueryData(['todos'], (old: any) => {
        return {
          ...old,
          data: old.data.filter((todo: any) => todo.id !== newTodo.id)
        }
      })

      return { previousTodos }
    },
    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData(['todos'], context.previousTodos)
      console.log(err)
    },
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const { mutate: updateTodo, isLoading: isUpdateing } = useMutation({
    mutationFn: async ({ id, done }: { id: string, done: boolean }) => {
      return await axiosInstance.put('/todo/' + id, {
        name: 'Updated',
        description: 'Updated description',
        done
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    },
    onMutate: async (newTodo: any) => {
      setModifyingId(newTodo.id)
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData(['todos'])

      queryClient.setQueryData(['todos'], (old: any) => {
        const indexToUpdate = old.data.findIndex((todo: any) => todo.id === newTodo.id)

        const newTodos = [...old.data]
        newTodos[indexToUpdate] = newTodo

        return {
          ...old,
          data: newTodos
        }
      })

      return { previousTodos }
    },
    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData(['todos'], context.previousTodos)
      console.log(err)
    },
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setModifyingId('')
    }
  })

  const { mutate: addTodo } = useMutation({
    mutationFn: async ({
      name, description
    }: { name: string, description: string }) => {
      return await axiosInstance.post('/todo', {
        name,
        description
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') as string}`
        }
      })
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData(['todos'])

      queryClient.setQueryData(['todos'], (old: any) => {
        return {
          ...old,
          data: [...old.data, newTodo]
        }
      })

      return { previousTodos }
    },
    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData(['todos'], context.previousTodos)
      console.log(err)
    },
    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  return {
    todos,
    updateTodo,
    deleteTodo,
    addTodo,
    isLoading,
    isModifying: isUpdateing,
    modifyingId
  }
}

export default useTodo
