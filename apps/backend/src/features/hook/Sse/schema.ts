import { FastifySchema, RouteGenericInterface } from 'fastify'

import { EventSchema } from '../../../utils/typebox/event'

export interface Interface extends RouteGenericInterface {}

const Event = EventSchema

export const Schema: FastifySchema = {
  tags: ['hook'],
  security: [{ bearerAuth: [] }],
  produces: ['text/event-stream'],
  description: 'Subscribe to server sent events',
  response: {
    default: Event,
  },
}
