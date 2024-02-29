import { FastifyInstance } from 'fastify'

import { Session } from '../features/session'

const { Create, Code, Connect } = Session

const route = async (fastify: FastifyInstance) => {
  // GET
  fastify.get('/code', Code.Shorthand, Code.Route(fastify))

  // POST
  fastify.post('', Create.Shorthand, Create.Route(fastify))
  fastify.post('/connect', Connect.Shorthand, Connect.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/sessions' })
}
