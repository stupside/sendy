import { OutgoingHttpHeaders } from 'http2'

import { MyRoute, subscribe } from '../../../fastify'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = request.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const headers: OutgoingHttpHeaders = {
      connection: 'keep-alive',
      'cache-control': 'no-cache',
      'content-type': 'text/event-stream',
      'access-control-allow-origin': fastify.config.MY_FRONTEND_CSR_URL,
    }

    response.raw.writeHead(200, headers)

    const unsubscribe = await subscribe({
      fastify,
      user: identity.user,
      handle: async ({ type, data }) => {
        response.raw.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`)
      },
    })

    request.raw.on('close', unsubscribe)
  }
