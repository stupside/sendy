import { Static } from '@sinclair/typebox'

import { MyRoute, dispatch, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Hook } from '../../hook'
import { Media } from '../../media'
import { Server } from '../../server'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const code = request.body.code.toLowerCase()

    const value = await fastify.redis.codes.getdel(code)

    if (!value) return response.unauthorized('Invalid code.')

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
        Media.Cast.Claim,
        Server.Config.Claim,
        Media.Retrieve.Claim,
      ],
    }

    const token = await response.jwtSign(payload)

    await dispatch(fastify, '/session/peer', {
      target: `session:${session}`,
      payload: {
        device: device.id,
      },
    })

    return await response.send({
      token,
      device: device.id,
      session: device.sessionId,
    })
  }
