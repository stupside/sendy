import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

import { MediaDynSchema } from '../../../utils/typebox/media'

const Params = Type.Object({
  id: Type.Integer({ description: 'The id of the media.' }),
})

const Reply = Type.Intersect([
  Type.Object({
    date: Type.Integer({
      description: 'The date when the media was casted',
    }),
  }),
  MediaDynSchema,
])

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['media'],
  security: [{ bearerAuth: [] }],
  description: 'Retrieve a media by id.',
  params: Params,
  response: {
    200: Reply,
  },
}
