import { hook } from '../auth'
import MyRoute from './MyRoute'
import {
  FastifySchema,
  RouteGenericInterface,
  RouteShorthandOptions,
} from 'fastify'

export const Featured = <TInterface extends RouteGenericInterface>(
  action: string,
  schema: FastifySchema,
  route: MyRoute<TInterface>,
) => {
  const shorthand: RouteShorthandOptions = {
    schema,
    onError: (_, response) => {
      return response.imateapot()
    },
    onRequest: schema.security ? hook([action]) : undefined,
  }

  return {
    Claim: action,
    Route: route,
    Schema: schema,
    Shorthand: shorthand,
  }
}

export { MyRoute }
