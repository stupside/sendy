import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object({
  callback: Type.String({
    format: 'uri',
    description: 'The callback URL.',
  }),
})

const Reply = Type.Object({
  code: Type.String({
    description: 'The code of the session.',
  }),
  qrcode: Type.String({
    description: 'The QR code of the session.',
  }),
})

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
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
