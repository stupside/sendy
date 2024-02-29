import { Session } from '../features/session'
import { FastifyInstance } from 'fastify'

const { Code } = Session

const route = async (fastify: FastifyInstance) => {
  fastify.post('/code', Code.Shorthand, Code.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/sessions' })
}
