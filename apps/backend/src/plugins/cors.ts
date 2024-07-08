import fp from 'fastify-plugin'

import cors from '@fastify/cors'

/**
 * This plugins adds some utilities to enable cors policies
 *
 * @see https://github.com/fastify/fastify-cors
 */
const plugin = fp(async (fastify) => {
  await fastify.register(cors, {
    hook: 'preHandler',
    origin: [
      fastify.config.FRONTEND_URL,
      ...(fastify.config.NODE_ENV === 'development'
        ? [
            `http://127.0.0.1:${fastify.config.PORT}`,
            `http://localhost:${fastify.config.PORT}`,
          ]
        : []),
    ],
  })
})

export default plugin
