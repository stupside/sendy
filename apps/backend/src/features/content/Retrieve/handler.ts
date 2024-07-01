import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const content = await prisma.content.findFirstOrThrow({
      where: {
        id: request.params.id,
        session: {
          id: identity.session,
        },
      },
      select: {
        type: true,
        value: true,
        subtype: true,
      },
    })

    return await response.send({
      value: content.value,
      type: content.type,
      subtype: content.subtype,
    })
  }
