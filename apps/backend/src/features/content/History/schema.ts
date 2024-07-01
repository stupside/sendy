import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Array(
  Type.Object({
    value: Type.String({ description: 'The value of the content.' }),
    type: Type.String({ description: 'The type of the content.' }),
    subtype: Type.String({
      description: 'The handler of the content.',
    }),
  }),
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['content'],
  security: [{ bearerAuth: [] }],
  description: 'Get history of contents for the current session.',
  response: {
    200: Reply,
  },
}
