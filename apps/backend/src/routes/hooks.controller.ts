import { FastifyInstance } from 'fastify'

import { Hook } from '../features/hook'

const { Sse } = Hook

const route = async (fastify: FastifyInstance) => {
  fastify.get('/sse', Sse.Shorthand, Sse.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/hooks' })
}
