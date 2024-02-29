import { Static } from '@sinclair/typebox'

import { MyRoute, dispatch, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Hook } from '../../hook'
import { Content } from '../../content'
import { Server } from '../../server'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const value = await fastify.redis.codes.getdel(
      request.body.key.toLowerCase(),
    )

    if (!value) return response.unauthorized()

    const session = Number.parseInt(value)

    const ip = request.body.device?.ip ?? request.ip
    const agent = request.body.device?.agent ?? request.headers['user-agent']

    const device = await prisma.device.create({
      data: {
        ip,
        agent,
        session: {
          connect: {
            id: session,
          },
        },
      },
      select: {
        id: true,
        sessionId: true,
      },
    })

    const payload: Static<typeof MySessionSchema> = {
      device: device.id,
      session: device.sessionId,
      claims: [
        Hook.Sse.Claim,
        Content.Cast.Claim,
        Server.Config.Claim,
        Content.Retrieve.Claim,
      ],
    }

    const token = await response.jwtSign(payload)

    await dispatch({
      fastify,
      target: `session:${session}`,
      event: {
        type: '/session/connect',
        data: {
          device: device.id,
        },
      },
    })

    return await response.send({
      token,
      device: device.id,
      session: device.sessionId,
    })
  }
