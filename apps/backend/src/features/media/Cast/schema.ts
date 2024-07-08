import { type FastifySchema, type RouteGenericInterface } from 'fastify'

import { Type, type Static } from '@sinclair/typebox'

import { MediaSchema } from '../../../utils/typebox/media'

const Body = Type.Intersect([
  Type.Object({
    value: Type.String({
      description: 'The value of the media.',
    }),
  }),
  MediaSchema,
])

const Reply = Type.Object({
  id: Type.Integer({
    description: 'The id of the media.',
  }),
})

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

const Schema: FastifySchema = {
  tags: ['media'],
  security: [{ bearerAuth: [] }],
  description: 'Cast a media.',
  body: Body,
  response: {
    200: Reply,
  },
}

export { Schema }
