import { FastifyPluginAsync } from 'fastify'

import fp from 'fastify-plugin'

import { Publisher, Subscriber } from 'zeromq'

interface IZeroMQ {
  publisher: Publisher
  subscriber: () => Promise<Subscriber>
}

declare module 'fastify' {
  interface FastifyInstance {
    zeromq: IZeroMQ
  }
}

const zeromq: FastifyPluginAsync = async (fastify) => {
  const publisher = new Publisher()

  await publisher.bind(fastify.config.ZEROMQ_URL)

  const decorator: IZeroMQ = {
    publisher,
    subscriber: async () => {
      const subscriber = new Subscriber()

      subscriber.connect(fastify.config.ZEROMQ_URL)

      return subscriber
    },
  }

  fastify.decorate('zeromq', decorator)

  fastify.addHook('onClose', async () => {
    publisher.close()
  })
}

export default fp(zeromq)
