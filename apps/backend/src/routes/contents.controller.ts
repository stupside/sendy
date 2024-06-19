import { type FastifyInstance } from 'fastify'

import { Content } from '../features/content'

const { Cast, History, Retrieve } = Content

const route = async (fastify: FastifyInstance) => {
  fastify.post('/cast', Cast.Shorthand, Cast.Route(fastify))

  fastify.get('/:id', Retrieve.Shorthand, Retrieve.Route(fastify))
  fastify.get('/history', History.Shorthand, History.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/contents' })
}
