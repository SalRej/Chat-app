import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type ITokenHeader } from '../interfaces/user'
import { PrismaClient } from '@prisma/client'
import pusher from '../config/pusher'
import sharp from 'sharp'
import fs from 'fs'
import isImageFile from '../utilis/isImageFile'
import generateFileName from '../utilis/generateFileName'
import getExtension from '../utilis/getExtention'
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
      const channel1Name = [user.id, recieverId].sort().join('-')
      const channel2Name = `messages-${recieverId}`

      pusher.trigger(channel1Name, 'message_sent', {
        message
      })

      pusher.trigger(channel2Name, 'message_recieved', {
        message,
        senderId: user.id
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
  const { id } = req.headers
  const { recieverId } = req.body as any
  const file: any = req.file

  const fileName = file.filename as string

  if (isImageFile(fileName)) {
    const newFileName = generateFileName(getExtension(fileName))

    try {
      await sharp(`public/uploads/${fileName}`)
        .resize(300, 300)
        .toFile(`public/uploads/${newFileName}`)

      fs.unlink(`public/uploads/${fileName}`, (error) => {
        console.log(error)
      })

      const message = await prisma.message.create({
        data: {
          text: `public/uploads/${newFileName}`,
          recieverId,
          senderId: id as string,
          isImage: true
        }
      })

      if (message) {
        const channelName = [id as string, recieverId as string].sort().join('-')

        pusher.trigger(channelName, 'message_sent', {
          message
        })

        return await res.code(200).send(message)
      } else {
        return await res.code(200).send('Could not create the message')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const seenMessageHanlder = async (
  req: FastifyRequest<{ Headers: ITokenHeader, Body: { messageId: string, recieverId: string } }>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.headers
  const { messageId, recieverId } = req.body

  const updatedMessage = await prisma.message.update({
    where: {
      id: messageId
    },
    data: {
      isSeen: true
    }
  })

  if (updatedMessage) {
    const channel1Name = `messages-${id as string}`
    const channel2Name = `messages-${recieverId}`

    pusher.trigger([channel1Name, channel2Name], 'message_seen', {
      message: updatedMessage,
      recieverId
    })

    return await res.code(201).send(updatedMessage)
  }
  return await res.code(400).send({ message: 'Could not update message' })
}
