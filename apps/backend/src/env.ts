import env, { FastifyEnvOptions } from '@fastify/env'
import { Static, Type } from '@sinclair/typebox'

import { formats } from './utils/ajv'
import fp from 'fastify-plugin'

const Schema = Type.Object(
  {
    TZ: Type.String({
      default: 'Etc/UTC',
    }),

    NODE_ENV: Type.String({
      default: 'development',
      enum: ['development', 'production', 'test'],
    }),

    PORT: Type.Integer({
      minimum: 1024,
      default: 3000,
    }),
    HOST: Type.String({
      format: 'ipv4',
      default: '127.0.0.1',
    }),

    JWT_EXPIRY: Type.Integer({
      minimum: 3600,
      default: 43200,
    }),

    JWT_SECRET: Type.String(),

    BACKEND_URL: Type.String({
      format: 'uri',
      default: 'http://127.0.0.1:3000',
    }),

    FRONTEND_URL: Type.String({
      format: 'uri',
      default: 'http://127.0.0.1:8080',
    }),

    ZEROMQ_URL: Type.String({
      format: 'uri',
      default: 'tcp://127.0.0.1:6666',
    }),
    DATABASE_URL: Type.String({
      format: 'uri',
      default: 'postgresql://sendy:sendy@localhost:5432/sendy?schema=public',
    }),

    SESSION_CODE_LENGTH: Type.Integer({
      minimum: 2,
      default: 4,
      maximum: 8,
    }),
    SESSION_CODE_PERIOD: Type.Integer({
      default: 30,
      minimum: 30,
      maximum: 120,
      description: 'In seconds.',
    }),
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

export { Schema }

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
