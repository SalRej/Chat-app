import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type ITokenHeader } from '../interfaces/user'
import { PrismaClient } from '@prisma/client'
import pusher from '../config/pusher'

const prisma = new PrismaClient()

export const getMessagesHandler = async (
  req: FastifyRequest<{ Headers: ITokenHeader, Params: { chattingUserId: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.headers
  const { chattingUserId } = req.params

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { recieverId: id, senderId: chattingUserId },
        { recieverId: chattingUserId, senderId: id }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  if (messages) {
    return await res.code(200).send(messages)
  } else {
    return await res.code(200).send([])
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
      const channelName = [user.id, recieverId].sort().join('-')

      pusher.trigger(channelName, 'message_sent', {
        message
      })

      return await res.code(200).send(message)
    } else {
      return await res.code(200).send('Could not create the message')
    }
  }
}

export const createMessageWithImageHandler = async (
  req: FastifyRequest<{ Headers: ITokenHeader, Body: any }>,
  res: FastifyReply
): Promise<void> => {
  const { email } = req.headers
  const { recieverId } = req.body as any
  const file: any = req.file
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  const fileName = file.filename // Get the file path

  if (user) {
    const message = await prisma.message.create({
      data: {
        text: `public/uploads/${fileName as string}`,
        recieverId,
        senderId: user.id,
        isImage: true
      }
    })

    if (message) {
      const channelName = [user.id, recieverId as string].sort().join('-')

      pusher.trigger(channelName, 'message_sent', {
        message
      })

      return await res.code(200).send(message)
    } else {
      return await res.code(200).send('Could not create the message')
    }
  }
}
