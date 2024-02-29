import { type FastifySchema, type RouteGenericInterface } from 'fastify'

import { type Static, Type } from '@sinclair/typebox'

const Body = Type.Object({
  value: Type.String({ description: 'The value of the content.' }),
  type: Type.String({
    description: 'The type of the content.',
  }),
  subtype: Type.String({ description: 'The subtype of the content.' }),
})

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
}

const Schema: FastifySchema = {
  tags: ['content'],
  security: [{ bearerAuth: [] }],
  description: 'Create a content.',
  body: Body,
}

export { Schema }
