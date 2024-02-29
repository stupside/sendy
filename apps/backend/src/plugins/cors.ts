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
    origin: [fastify.config.MY_FRONTEND_CSR_URL],
  })
})

export default plugin
