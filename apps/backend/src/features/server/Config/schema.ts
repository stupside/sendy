import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object(
  {
    code: Type.Object(
      {
        len: Type.Integer({
          description: 'The length of session codes.',
        }),
      },
      {
        description: 'The code configuration.',
      },
    ),
  },
  {
    description: 'The configuration of the service.',
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['server'],
  description: "Get the service's configuration.",
  response: {
    200: Reply,
  },
}
