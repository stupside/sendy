import { Value } from '@sinclair/typebox/value'

import { MyRoute } from '../../../fastify'
import { MediaSchema } from '../../../utils/typebox/media'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (!identity) return response.unauthorized()

    const medias = await fastify.prisma.media.findMany({
      where: {
        session: {
          id: identity.session,
        },
        type: request.query.type,
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
          date: media.date.getTime(),
          ...Value.Cast(MediaSchema, {
            type: media.type,
            handler: media.handler,
            metadata: JSON.parse(media.metadata),
          }),
        }
      }),
    )
  }
