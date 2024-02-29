import { Static } from '@sinclair/typebox'

import { dispatch, MyRoute, MySessionSchema } from '../../../fastify'
import { Hook } from '../../hook'
import { Media } from '../../media'
import { Server } from '../../server'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const value = request.body.code.toUpperCase()

    const now = new Date()

    const code = await fastify.prisma.code.findFirst({
      where: {
        value,
        expiry: {
          gt: now,
        },
        used: false,
      },
      select: {
        id: true,
        expiry: true,
        sessionId: true,
      },
      orderBy: {
        creation: 'desc',
      },
    })

    if (!code) return response.badRequest('Invalid code')

    await fastify.prisma.code.update({
      data: {
        used: true,
      },
      where: {
        id: code.id,
      },
    })

    const ip = request.body.device?.ip ?? request.ip
    const agent = request.body.device?.agent ?? request.headers['user-agent']

    const device = await fastify.prisma.device.create({
      data: {
        ip,
        agent,
        session: {
          connect: {
            id: code.sessionId,
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

    await dispatch({
      event: '/session/peer',
      publisher: fastify.zeromq.publisher,
      params: {
        metadata: {
          device: device.id,
        },
        target: `session:${code.sessionId}`,
      },
    })

    const token = await response.jwtSign(payload)

    return await response.send({
      token,
      device: device.id,
      session: device.sessionId,
    })
  }
