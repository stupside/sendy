import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object({
  expiry: Type.Optional(
    Type.Integer({
      minimum: 15,
      default: 30,
      maximum: 60 * 2,
      description: 'When will the code expire from now, in seconds.',
    }),
  ),
  redirection: Type.String({
    format: 'uri',
    description: 'Where the qr code should redirect the user to.',
  }),
})

const Reply = Type.Object({
  qr: Type.String({ description: 'The qr code wrapping the session code.' }),
  raw: Type.String({ description: 'The key to retrieve a long lived token.' }),
  expiry: Type.Integer({
    description: 'When will the code expire.',
  }),
})

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Body: Static<typeof Body>
}

export const Schema: FastifySchema = {
  tags: ['session'],
  security: [{ bearerAuth: [] }],
  description: 'Generate a code to connect to a session.',
  body: Body,
  response: {
    200: Reply,
  },
}
