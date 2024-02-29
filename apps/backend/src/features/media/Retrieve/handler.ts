import { Value } from '@sinclair/typebox/value'

import { MyRoute } from '../../../fastify'
import { MediaSchema } from '../../../utils/typebox/media'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (!identity) return response.unauthorized()

    const media = await fastify.prisma.media.findFirst({
      where: {
        id: request.params.id,
        session: {
          id: identity.session,
        },
      },
      select: {
        type: true,
        value: true,
        handler: true,
        metadata: true,
      },
    })

    if (!media) return response.notFound()

    return await response.send({
      value: media.value,
      ...Value.Cast(MediaSchema, {
        type: media.type,
        handler: media.handler,
        metadata: JSON.parse(media.metadata),
      }),
    })
  }
