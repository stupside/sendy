import fp from 'fastify-plugin'

import jwt from '@fastify/jwt'

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-jwt
 */
const plugin = fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: Buffer.from(fastify.config.MY_JWT_SECRET, 'hex'),
    sign: {
      iss: 'fastack',
      aud: 'fastack.aud',
      expiresIn: fastify.config.MY_JWT_EXPIRY,
    },
  })
})

export default plugin
