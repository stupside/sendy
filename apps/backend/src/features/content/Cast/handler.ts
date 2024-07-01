import { MyRoute, dispatch } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const content = await prisma.content.create({
      data: {
        type: request.body.type,
        value: request.body.value,
        subtype: request.body.subtype,

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
        value: true,
      },
    })

    await dispatch({
      fastify,
      target: `session:${identity.session}`,
      event: {
        type: '/content/cast',
        data: {
          id: content.id,
          type: content.type,
          value: content.value,
        },
      },
    })

    return await response.redirect(`/contents/${content.id}`)
  }
