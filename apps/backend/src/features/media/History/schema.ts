import { FastifySchema, RouteGenericInterface } from 'fastify'

import { MediaType } from '@prisma/client'

import { Static, Type } from '@sinclair/typebox'

import { MediaDynSchema } from '../../../utils/typebox/media'

const Query = Type.Object({
  type: Type.Optional(
    Type.Enum(MediaType, { description: 'The type of the media' }),
  ),
})

const Reply = Type.Array(
  Type.Intersect([
    Type.Object({
      id: Type.Integer({ description: 'The id of the media.' }),
      date: Type.Integer({
        description: 'The date when the media was casted.',
      }),
    }),
    MediaDynSchema,
  ]),
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Querystring: Static<typeof Query>
}

export const Schema: FastifySchema = {
  tags: ['media'],
  security: [{ bearerAuth: [] }],
  description: 'Get history of casted medias for the current session.',
  response: {
    200: Reply,
  },
  querystring: Query,
}
