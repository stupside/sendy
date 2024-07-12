import { generateKeySync } from 'node:crypto'

import QRCode from 'qrcode'

import { FastifyInstance } from 'fastify'

import { MyRoute } from '../../../fastify'

import { Interface } from './schema'

const key = (fastify: FastifyInstance) => {
  return generateKeySync('hmac', {
    length: fastify.config.SESSION_CODE_LENGTH * 4,
  })
    .export()
    .toString('hex')
}

const expiry = (fastify: FastifyInstance) => {
  return new Date(Date.now() + fastify.config.SESSION_CODE_PERIOD * 1000)
}

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const now = new Date()

    const code = await fastify.prisma.code
      .findFirst({
        where: {
          expiry: {
            gt: now,
          },
          used: false,
          session: {
            id: identity.session,
          },
        },
        orderBy: {
          creation: 'desc',
        },
        select: {
          id: true,
          value: true,
          expiry: true,
        },
      })
      .then((code) => {
        if (code) return code

        return fastify.prisma.code.create({
          data: {
            expiry: expiry(fastify),
            value: key(fastify).toUpperCase(),
            session: {
              connect: {
                id: identity.session,
              },
            },
          },
          select: {
            id: true,
            value: true,
            expiry: true,
          },
        })
      })

    response.header('Cache-Control', 'no-store, no-cache, must-revalidate')

    const data = JSON.stringify({
      code: code.value,
    })

    return await response.send({
      code: code.value,
      expiry: code.expiry.getUTCDate(),
      qrcode: await QRCode.toDataURL(
        `${request.body.callback}${Buffer.from(data).toString('base64')}`,
        {
          errorCorrectionLevel: 'M',
        },
      ),
    })
  }
