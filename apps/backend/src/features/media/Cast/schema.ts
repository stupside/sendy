import { type FastifySchema, type RouteGenericInterface } from 'fastify'

import { type Static } from '@sinclair/typebox'

import { MediaDynSchema } from '../../../utils/typebox/media'

const Body = MediaDynSchema

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
}

const Schema: FastifySchema = {
  tags: ['media'],
  security: [{ bearerAuth: [] }],
  description: 'Cast a media.',
  body: Body,
  response: {
    303: {},
  },
}

export { Schema }
