import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object({
  code: Type.Object({
    len: Type.Integer(),
  }),
})

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  description: "Get the config service's configuration.",
  response: {
    200: Reply,
  },
}
