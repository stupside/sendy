import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const medias = await prisma.media.findMany({
    where: {
      session: {
        id: identity.session,
      },
    },
    select: {
      id: true,
      date: true,
      type: true,
      value: true,
      handler: true,
      metadata: true,
    },
  })

  return await response.send(
    medias.map((media) => {
      if (typeof media.metadata !== 'string') throw new Error()

      return {
        id: media.id,
        type: media.type,
        value: media.value,
        handler: media.handler,
        date: media.date.getUTCDate(),
        metadata: JSON.parse(media.metadata),
      }
    }),
  )
}
