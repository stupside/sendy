import fp from 'fastify-plugin'

import redis from '@fastify/redis'

declare module '@fastify/redis' {
  interface FastifyRedisNamespacedInstance {
    sse: FastifyRedis
    codes: FastifyRedis
  }
}

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
const plugin = fp(async (fastify) => {
  await fastify.register(redis, {
    namespace: 'sse',
    url: fastify.config.MY_REDIS_URL,
  })

  await fastify.register(redis, {
    namespace: 'codes',
    url: fastify.config.MY_REDIS_URL,
  })
})

export default plugin
