import { FastifyPluginAsync } from 'fastify'

import { PrismaClient } from '@prisma/client'

import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prisma: FastifyPluginAsync = async (fastify) => {
  const client = new PrismaClient({
    datasourceUrl: fastify.config.DATABASE_URL,
  })

  await client.$connect()

  fastify.decorate('prisma', client)

  fastify.addHook('onClose', async (fastify) => {
    await fastify.prisma.$disconnect()
  })
}

export default fp(prisma)
