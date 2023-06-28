import { type FastifyRequest, type FastifyInstance } from 'fastify'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import { createTodoSchema } from '../schemas/todo'
import { createTodoHandler } from '../controllers/todo'

export const todoRoutes = async (fastify: FastifyInstance, options: any, done: () => void): Promise<void> => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
    done()
  })

  fastify.post('/todo', createTodoSchema, createTodoHandler)
}
