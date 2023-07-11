interface Message {
  text: string
  isImage: boolean
  isSeen: boolean
  senderId: string
  recieverId: string
  createdAt: string
  id: string
}

export default Message
