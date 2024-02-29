import { Static } from '@sinclair/typebox'

import { MySessionSchema } from '..'
import { onRequestHookHandler } from 'fastify'

const hook = (claims: Array<string>): onRequestHookHandler => {
  return async (request, response) => {
    const identity = await request.jwtVerify<Static<typeof MySessionSchema>>()

    if (claims.every((claim) => identity.claims.includes(claim)) === false)
      return await response.forbidden()

    request.requestContext.set('identity', identity)
  }
}

export default hook
