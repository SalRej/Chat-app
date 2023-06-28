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
