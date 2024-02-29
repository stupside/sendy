import sensible from '@fastify/sensible'

import fp from 'fastify-plugin'

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
const plugin = fp(async (fastify) => {
  await fastify.register(sensible)
})

export default plugin
