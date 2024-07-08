import fp from 'fastify-plugin'

import jwt from '@fastify/jwt'

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-jwt
 */
const plugin = fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: Buffer.from(fastify.config.JWT_SECRET, 'hex'),
    sign: {
      iss: 'sendy',
      aud: 'sendy.aud',
      expiresIn: fastify.config.JWT_EXPIRY,
    },
  })
})

export default plugin
