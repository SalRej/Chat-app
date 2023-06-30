import { type FastifyRequest, type FastifyInstance } from 'fastify'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import { getMessagesSchema } from '../schemas/message'
import { getMessagesHandler } from '../controllers/message'

export const messagesRoutes = async (fastify: FastifyInstance, options: any, done: () => void): Promise<void> => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
  })

  fastify.get('/message/:chattingUserId', getMessagesSchema, getMessagesHandler)
  done()
}
