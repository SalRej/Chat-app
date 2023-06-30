import { type FastifyRequest, type FastifyInstance } from 'fastify'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import { createTodoSchema, deleteTodoSchema, getAlltodosSchema, updateTodoSchema } from '../schemas/todo'
import { createTodoHandler, delteTodoHandler, getAllTodosHandler, updateTodoHandler } from '../controllers/todo'

export const todoRoutes = async (fastify: FastifyInstance, options: any, done: () => void): Promise<void> => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
  })

  fastify.post('/todo', createTodoSchema, createTodoHandler)
  fastify.get('/todo', getAlltodosSchema, getAllTodosHandler)
  fastify.put('/todo/:id', updateTodoSchema, updateTodoHandler)
  fastify.delete('/todo/:id', deleteTodoSchema, delteTodoHandler)

  done()
}
