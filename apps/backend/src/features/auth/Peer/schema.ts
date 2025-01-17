import { Static, Type } from '@sinclair/typebox'

import { FastifySchema, RouteGenericInterface } from 'fastify'

const Body = Type.Object({
  code: Type.String({
    description: 'The code to connect to the session.',
  }),
  device: Type.Partial(
    Type.Object({
      ip: Type.String({ description: 'The ip of the device.', format: 'ipv4' }),
      agent: Type.String({ description: 'The agent attached to the device.' }),
    }),
  ),
})

const Reply = Type.Object({
  token: Type.String({ description: 'The client token.' }),
  device: Type.Integer({ description: 'The id of the device.' }),
  session: Type.Integer({ description: 'The id of the session.' }),
})

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['auth'],
  description: 'Connect to a session.',
  body: Body,
  response: {
    200: Reply,
  },
}
