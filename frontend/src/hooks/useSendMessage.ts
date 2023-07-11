import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axiosInstance from '../config/axiosInstance'

const useSendMessage = (): {
  textMessage: string
  setTextMessage: (text: string) => void
  sendMessage: ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => void
  sendImageMessage: (formaData: FormData) => void
  sendIconMessage: ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => void
} => {
  const [textMessage, setTextMessage] = useState('')

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => {
      return await axiosInstance.post('/message', {
        messageText: textMessage,
        recieverId
      })
    },
    onSettled: () => {
      setTextMessage('')
    }
  })

  const { mutate: sendImageMessage } = useMutation({
    mutationFn: async (formData: any) => {
      await axiosInstance.post('/message/image', formData)
    }
  })

  const { mutate: sendIconMessage } = useMutation({
    mutationFn: async ({ textMessage, recieverId }: { textMessage: string, recieverId: string }) => {
      return await axiosInstance.post('/message/icon', {
        messageText: textMessage,
        recieverId
      })
    }
  })

  return {
    sendMessage,
    sendImageMessage,
    textMessage,
    setTextMessage,
    sendIconMessage
  }
}

export default useSendMessage
