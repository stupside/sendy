import { type FastifyInstance } from 'fastify'

import { Server } from '../features/server'

const { Config } = Server

const route = async (fastify: FastifyInstance) => {
  fastify.get('/config', Config.Shorthand, Config.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/server' })
}
