import fp from 'fastify-plugin'

import env, { FastifyEnvOptions } from '@fastify/env'

import { Type, Static } from '@sinclair/typebox'

import { formats } from './utils/ajv'

const Schema = Type.Object(
  {
    TZ: Type.String({
      default: 'Etc/UTC',
    }),

    PORT: Type.Number({
      default: 3000,
    }),
    HOST: Type.String({
      format: 'ipv4',
      default: '127.0.0.1',
    }),

    MY_JWT_EXPIRY: Type.String({
      default: '1h',
    }),
    MY_JWT_SECRET: Type.String(),

    MY_BACKEND_URL: Type.String({
      format: 'uri',
      default: 'http://127.0.0.1:3000',
    }),
    MY_FRONTEND_CSR_URL: Type.String({
      format: 'uri',
      default: 'http://127.0.0.1:8080',
    }),

    MY_REDIS_URL: Type.String(),
    MY_DATABASE_URL: Type.String(),
  },
  {
    readOnly: true,
  },
)

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof Schema>
  }
}

/**
 * This plugins to work with .env.X
 *
 * @see https://github.com/fastify/fastify-env
 */

const plugin = fp(async (fastify) => {
  const options: FastifyEnvOptions = {
    dotenv: true,
    ajv: formats,
    schema: Schema,
    data: process.env,
  }

  await fastify.register(env, options)
})

export default plugin
