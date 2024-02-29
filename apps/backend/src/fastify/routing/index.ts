import {
  FastifySchema,
  RouteGenericInterface,
  RouteShorthandOptions,
} from 'fastify'

import MyRoute from './MyRoute'

import { hook } from '../auth'

export const Featured = <TInterface extends RouteGenericInterface>(
  action: string,
  schema: FastifySchema,
  route: MyRoute<TInterface>,
) => {
  const shorthand: RouteShorthandOptions = {
    schema,
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
