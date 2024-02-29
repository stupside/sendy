import { Static } from '@sinclair/typebox'

import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Hook } from '../../hook'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const user = await prisma.user.create({
    data: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password, // TODO: hash with argon2
    },
    select: {
      id: true,
    },
  })

  const payload: Static<typeof MySessionSchema> = {
    user: user.id,
    claims: [Hook.Sse.Claim],
  }

  const token = await response.jwtSign(payload)

  return await response.send({
    token,
    id: user.id,
  })
}
