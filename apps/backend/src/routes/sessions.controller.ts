import { FastifyInstance } from 'fastify'

import { Session } from '../features/session'

const { Code } = Session

const route = async (fastify: FastifyInstance) => {
  fastify.post('/code', Code.Shorthand, Code.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/sessions' })
}
