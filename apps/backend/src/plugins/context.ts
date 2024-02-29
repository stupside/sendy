import { fastifyRequestContext } from '@fastify/request-context'

import fp from 'fastify-plugin'

/**
 * This plugins adds request context support
 *
 * @see https://github.com/fastify/fastify-request-context
 */
const plugin = fp(async (fastify) => {
  await fastify.register(fastifyRequestContext, {})
})

export default plugin
