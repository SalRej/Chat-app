import { type FastifyInstance, type FastifyRequest } from 'fastify'
import { createUserSchema, getAllOtherUsersSchema, getUserSchema, loginUserSchema } from '../schemas/user'
import { createUserHandler, getAllOtherUsersHandler, getUserHandler, loginUserHandler, pusherPresenceSubscribeHandler, updateUserHanlder } from '../controllers/user'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import upload from '../config/multer'

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
  fastify.post('/pusher/auth', {
    preValidation: (req, reply, done) => {
    // Override content type for Pusher authorization
      req.headers['content-type'] = 'application/x-www-form-urlencoded'
      done()
    }
  }, pusherPresenceSubscribeHandler)

  fastify.put('/user', { preHandler: upload.single('image') }, updateUserHanlder)
  done()
}
