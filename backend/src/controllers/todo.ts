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

    return await res.code(201).send(todo)
  }

  return await res.code(400).send('Such a user does not exist')
}
