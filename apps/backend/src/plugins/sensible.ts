import fp from 'fastify-plugin'

import sensible from '@fastify/sensible'

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
const plugin = fp(async (fastify) => {
  await fastify.register(sensible)
})

export default plugin
