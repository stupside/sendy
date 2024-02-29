import fp from 'fastify-plugin'

import redis from '@fastify/redis'

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
const plugin = fp(async (fastify) => {
  await fastify.register(redis, {
    namespace: 'myconsumer',
    url: fastify.config.MY_REDIS_URL,
  })

  await fastify.register(redis, {
    namespace: 'myproducer',
    url: fastify.config.MY_REDIS_URL,
  })
})

export default plugin
