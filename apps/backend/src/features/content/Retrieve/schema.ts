import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  id: Type.Integer({ description: 'The id of the content.' }),
})

const Reply = Type.Object({
  value: Type.String({ description: 'The value of the content.' }),
  type: Type.String({ description: 'The type of the content.' }),
  subtype: Type.String({
    description: 'The handler of the content.',
  }),
})

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['content'],
  security: [{ bearerAuth: [] }],
  description: 'Get a content.',
  params: Params,
  response: {
    200: Reply,
  },
}
