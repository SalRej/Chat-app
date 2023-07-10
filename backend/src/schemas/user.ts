
export const createUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3, maxLength: 10 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        confirmPassword: { type: 'string', minLength: 6 }
      },
      required: ['name', 'email', 'password']
    },
    response: {
      201: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              id: { type: 'string' }
            }
          },
          token: { type: 'string' }
        }
      }
    }
  }
}

export const getUserSchema = {
  schema: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  }
}

export const loginUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
      },
      required: ['password', 'email']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              id: { type: 'string' }
            }
          },
          token: { type: 'string' }
        }
      }
    }
  }
}

export const getAllOtherUsersSchema = {
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
            email: { type: 'string' },
            id: { type: 'string' },
            sentMessages: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  createdAt: { type: 'string' },
                  isImage: { type: 'boolean' }
                }
              }
            },
            recievedMessages: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  createdAt: { type: 'string' },
                  isImage: { type: 'boolean' }
                }
              }
            }
          }
        }
      }
    }
  }
}
