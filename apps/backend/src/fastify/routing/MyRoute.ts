import { FastifyInstance, RouteGenericInterface, RouteHandler } from 'fastify'

type MyRoute<TSchema extends RouteGenericInterface> = (
  fastify: FastifyInstance,
) => RouteHandler<TSchema>

export default MyRoute
