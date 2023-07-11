import { type FastifyRequest, type FastifyInstance } from 'fastify'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import { createMessageSchema, getMessagesSchema, seenMessageSchema } from '../schemas/message'
import { createMessageHandler, createMessageWithIconHandler, createMessageWithImageHandler, getMessagesHandler, seenMessageHanlder } from '../controllers/message'
import upload from '../config/multer'

export const messagesRoutes = async (fastify: FastifyInstance, options: any, done: () => void): Promise<void> => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
  })

  fastify.get('/message/:chattingUserId', getMessagesSchema, getMessagesHandler)
  fastify.post('/message', createMessageSchema, createMessageHandler)

  fastify.post('/message/image', { preHandler: upload.single('image') }, createMessageWithImageHandler)
  fastify.post('/message/seen', seenMessageSchema, seenMessageHanlder)
  fastify.post('/message/icon', createMessageSchema, createMessageWithIconHandler)
  done()
}
