import AutoLoad from '@fastify/autoload'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import env from './env'
import { formats } from './utils/ajv'
import fastify from 'fastify'
import path from 'path'

const prepare = async () => {
  const server = fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>()

  await server.register(env)

  await server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  })

  await server.register(AutoLoad, {
    routeParams: true,
    dirNameRoutePrefix: false,
    dir: path.join(__dirname, 'routes'),
  })

  server.setValidatorCompiler(({ schema }) => {
    return formats.compile(schema)
  })

  await server.ready()

  return server
}

prepare().then((server) => {
  server.listen({
    port: server.config.PORT,
  })
})
