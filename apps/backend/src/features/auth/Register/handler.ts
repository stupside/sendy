import { Static } from '@sinclair/typebox'

import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Hook } from '../../hook'
import { Server } from '../../server'
import { Media } from '../../media'
import Session from '../../session'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const session = await prisma.session.create({
    data: {
      devices: {
        create: {
          ip: request.body.ip ?? request.ip,
          agent: request.body.agent ?? request.headers['user-agent'],
        },
      },
    },
    select: {
      id: true,
      devices: {
        select: {
          id: true,
        },
      },
    },
  })

  const device = session.devices.at(0)

  if (device === undefined) {
    throw new Error('Device not created')
  }

  const payload: Static<typeof MySessionSchema> = {
    device: device.id,
    session: session.id,
    claims: [
      Hook.Sse.Claim,
      Session.Code.Claim,
      Server.Config.Claim,
      Media.History.Claim,
      Media.Retrieve.Claim,
    ],
  }

  const token = await response.jwtSign(payload)

  return await response.send({
    token,
    device: device.id,
    session: session.id,
  })
}
