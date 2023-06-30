import { type FastifyInstance, type FastifyRequest } from 'fastify'
import { createUserSchema, getAllOtherUsersSchema, getUserSchema, loginUserSchema } from '../schemas/user'
import { createUserHandler, getAllOtherUsersHandler, getUserHandler, loginUserHandler } from '../controllers/user'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'

export const userPublicRoutes = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
): void => {
  fastify.post('/user', createUserSchema, createUserHandler)
  fastify.post('/login', loginUserSchema, loginUserHandler)
  done()
}

export const userPrivateRoutes = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
): void => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
  })
  fastify.get('/user', getUserSchema, getUserHandler)
  fastify.get('/users', getAllOtherUsersSchema, getAllOtherUsersHandler)
  done()
}
