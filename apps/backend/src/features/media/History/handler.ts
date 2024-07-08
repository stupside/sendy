import { Value } from '@sinclair/typebox/value'

import { MyRoute } from '../../../fastify'

import { MediaSchema } from '../../../utils/typebox/media'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const medias = await fastify.prisma.media.findMany({
    where: {
      session: {
        id: identity.session,
      },
    },
    select: {
      id: true,
      date: true,
      type: true,
      handler: true,
      metadata: true,
    },
  })

  return await response.send(
    medias.map((media) => {
      return {
        id: media.id,
        date: media.date.getUTCDate(),
        ...Value.Cast(MediaSchema, {
          type: media.type,
          handler: media.handler,
          metadata: JSON.parse(media.metadata),
        }),
      }
    }),
  )
}
