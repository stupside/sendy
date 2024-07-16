import { MyRoute, dispatch } from '../../../fastify'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (!identity) return response.unauthorized()

    const media = await fastify.prisma.media.create({
      data: {
        type: request.body.type,
        value: request.body.value,
        handler: request.body.handler,
        metadata: JSON.stringify(request.body.metadata),
        device: {
          connect: {
            id: identity.device,
          },
        },
        session: {
          connect: {
            id: identity.session,
          },
        },
      },
      select: {
        id: true,
        type: true,
      },
    })

    await dispatch({
      event: '/media/cast',
      publisher: fastify.zeromq.publisher,
      params: {
        target: `session:${identity.session}`,
        metadata: {
          id: media.id,
          type: media.type,
        },
      },
    })

    return await response.send({ id: media.id })
  }
