import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Query = Type.Object({
  expiry: Type.Optional(
    Type.Integer({
      minimum: 15,
      maximum: 240,
      default: 30,
      description: 'When will the code expire, in seconds.',
    }),
  ),
  redirection: Type.Optional(
    Type.String({
      format: 'uri',
      description: 'Where the qr code should redirect the user to.',
    }),
  ),
})

const Reply = Type.Object({
  qr: Type.String({ description: 'The qr code wrapping the hash.' }),
  raw: Type.String({ description: 'The key to retrieve a long lived token.' }),
  expiry: Type.Integer({ description: 'From now, when will the code expire.' }),
})

export interface Interface extends RouteGenericInterface {
  Querystring: Static<typeof Query>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['session'],
  security: [{ bearerAuth: [] }],
  description: 'Generate a qr code to connect to a session as a client.',
  querystring: Query,
  response: {
    200: Reply,
  },
}
