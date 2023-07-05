
export const getMessagesSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            text: { type: 'string' },
            senderId: { type: 'string' },
            recieverId: { type: 'string' },
            isImage: { type: 'boolean' }
          }
        }
      }
    }
  }
}

export const createMessageSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        recieverId: { type: 'string' },
        messageText: { type: 'string' }
      }
    }
  }
}
