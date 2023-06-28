export const createTodoSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' }
      },
      required: ['name', 'description']
    },
    response: {
      201: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  }
}

export const getAlltodosSchema = {
  schema: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            id: { type: 'string' }
          }
        }
      }
    }
  }
}

export const updateTodoSchema = {
  schema: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' }
      },
      required: ['name', 'description']
    },
    response: {
      201: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  }
}

export const deleteTodoSchema = {
  schema: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' }
      }
    }
  }
}
