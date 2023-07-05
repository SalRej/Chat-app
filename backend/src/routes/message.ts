import { type FastifyRequest, type FastifyInstance } from 'fastify'
import verifyToken from '../controllers/auth/verifyToken'
import { type ITokenHeader } from '../interfaces/user'
import { createMessageSchema, getMessagesSchema } from '../schemas/message'
import { createMessageHandler, createMessageWithImageHandler, getMessagesHandler } from '../controllers/message'
import { v4 as uuidv4 } from 'uuid'

import multer from 'fastify-multer'
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop()
    const filename = `${uuidv4()}.${extension as string}`
    cb(null, filename)
  }
})
const upload = multer({ storage })

export const messagesRoutes = async (fastify: FastifyInstance, options: any, done: () => void): Promise<void> => {
  fastify.addHook('preHandler', (req: FastifyRequest <{ Headers: ITokenHeader }>, res, done) => {
    verifyToken(req, res, done)
  })

  fastify.get('/message/:chattingUserId', getMessagesSchema, getMessagesHandler)
  fastify.post('/message', createMessageSchema, createMessageHandler)

  fastify.post('/message/image', { preHandler: upload.single('image') }, createMessageWithImageHandler)
  done()
}
