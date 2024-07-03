import { MyRoute, dispatch } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const media = await prisma.media.create({
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

    await dispatch(fastify, '/media/cast', {
      target: `session:${identity.session}`,
      payload: {
        id: media.id,
        type: media.type,
      },
    })

    return await response.redirect(`/medias/${media.id}`)
  }
