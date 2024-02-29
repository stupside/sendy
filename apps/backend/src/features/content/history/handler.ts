import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const contents = await prisma.content.findMany({
    where: {
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
    contents,
  })
}
