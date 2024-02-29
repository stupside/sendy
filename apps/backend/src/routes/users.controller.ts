import { FastifyInstance } from 'fastify'

import { User } from '../features/user'

const { Register } = User

const route = async (fastify: FastifyInstance) => {
  fastify.post('', Register.Shorthand, Register.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/users' })
}
