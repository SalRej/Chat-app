
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
            isImage: { type: 'boolean' },
            isIcon: { type: 'boolean' },
            isText: { type: 'boolean' },
            id: { type: 'string' }
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

export const seenMessageSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        messageId: { type: 'string' },
        recieverId: { type: 'string' }
      },
      required: ['messageId', 'recieverId']
    }
  }
}
