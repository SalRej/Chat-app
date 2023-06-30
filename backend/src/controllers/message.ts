import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type ITokenHeader } from '../interfaces/user'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMessagesHandler = async (
  req: FastifyRequest<{ Headers: ITokenHeader, Params: { chattingUserId: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { email } = req.headers
  const { chattingUserId } = req.params

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { recieverId: user.id },
          { recieverId: chattingUserId },
          { senderId: user.id },
          { senderId: chattingUserId }
        ]
      }
    })

    if (messages) {
      return await res.code(200).send(messages)
    } else {
      return await res.code(200).send([])
    }
  }
}

export const createMessageHandler = async (
  req: FastifyRequest<{ Headers: ITokenHeader, Body: { messageText: string, recieverId: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { email } = req.headers
  const { recieverId, messageText } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user) {
    const message = await prisma.message.create({
      data: {
        text: messageText,
        recieverId,
        senderId: user.id
      }
    })

    if (message) {
      return await res.code(200).send(message)
    } else {
      return await res.code(200).send('Could not create the message')
    }
  }
}
