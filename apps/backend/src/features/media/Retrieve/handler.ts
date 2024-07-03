import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const media = await prisma.media.findFirstOrThrow({
      where: {
        id: request.params.id,
        session: {
          id: identity.session,
        },
      },
      select: {
        type: true,
        date: true,
        value: true,
        handler: true,
        metadata: true,
      },
    })

    if (typeof media.metadata !== 'string')
      throw new Error('Metadata is not a json string')

    return await response.send({
      type: media.type,
      value: media.value,
      handler: media.handler,
      date: media.date.getUTCDate(),
      metadata: JSON.parse(media.metadata),
    })
  }
