import { Auth } from '../features/auth'
import { FastifyInstance } from 'fastify'

const { Peer, Register } = Auth

const route = async (fastify: FastifyInstance) => {
  fastify.post('/peer', Peer.Shorthand, Peer.Route(fastify))
  fastify.post('/register', Register.Shorthand, Register.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/auth' })
}
