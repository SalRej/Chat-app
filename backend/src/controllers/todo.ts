import { type FastifyReply, type FastifyRequest } from 'fastify'
import type ITodo from '../interfaces/todo'
import { PrismaClient } from '@prisma/client'
import { type ITokenHeader } from '../interfaces/user'

const prisma = new PrismaClient()

export const createTodoHandler = async (
  req: FastifyRequest<{ Body: ITodo, Headers: ITokenHeader }>,
  res: FastifyReply
): Promise<void> => {
  const { name, description } = req.body
  const { email } = req.headers

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const todo = await prisma.todo.create({
      data: {
        name,
        description,
        userId: user.id
      }
    })

    if (todo) {
      return await res.code(201).send(todo)
    } else {
      return await res.code(409).send('Could not create a todo')
    }
  }

  return await res.code(400).send('Such a user does not exist')
}

export const getAllTodosHandler = async (
  req: FastifyRequest<{ Headers: ITokenHeader }>,
  res: FastifyReply
): Promise<void> => {
  const { email } = req.headers
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id
      }
    })

    return await res.code(200).send(todos)
  }
}

export const updateTodoHandler = async (
  req: FastifyRequest<{ Body: ITodo, Headers: ITokenHeader, Params: { id: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { name, description } = req.body
  const { email } = req.headers
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const todo = await prisma.todo.update({
      where: {
        id
      },
      data: {
        name,
        description,
        userId: user.id
      }
    })

    if (todo) {
      return await res.code(201).send(todo)
    } else {
      return await res.code(409).send('Could not create a todo')
    }
  }

  return await res.code(400).send('Such a user does not exist')
}

export const delteTodoHandler = async (
  req: FastifyRequest<{ Body: ITodo, Headers: ITokenHeader, Params: { id: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params
  const { email } = req.headers

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    try {
      await prisma.todo.delete({
        where: {
          id
        }
      })

      return await res.code(201).send('Todo deleted succsesfuly')
    } catch (e) {
      return await res.code(409).send('Could not delete the todo becouse such a record does not exist')
    }
  }

  return await res.code(400).send('Such a user does not exist')
}
