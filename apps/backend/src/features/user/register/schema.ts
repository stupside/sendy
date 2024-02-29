import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    name: Type.String({
      description: "The user's name",
      minLength: 5,
      maxLength: 15,
    }),
    email: Type.String({ description: "The user's email", format: 'email' }),
    password: Type.String({
      description: "The user's password",
      minLength: 8,
      maxLength: 20,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The user's id" }),
    token: Type.String({ description: "The user's token" }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['user'],
  description: 'Register a user',
  body: Body,
  response: {
    200: Reply,
  },
}
