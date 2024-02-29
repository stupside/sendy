import { generateKeySync } from 'crypto'

import QRCode from 'qrcode'

import { MyRoute } from '../../../fastify'

import { Interface } from './schema'

const OCT_SIZE = 4

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get('identity')

    if (identity === undefined) throw new Error('Unauthorized')

    const key = generateKeySync('hmac', {
      length: fastify.config.MY_SESSION_CODE_LEN * OCT_SIZE,
    })
      .export()
      .toString('hex')

    await fastify.redis.codes.setex(
      key,
      request.query.expiry ?? fastify.config.MY_SESSION_CODE_EXPIRY,
      identity.session,
    )

    const redirection =
      request.query.redirection ??
      `${fastify.config.MY_FRONTEND_CSR_URL}/api/connect`

    const callback = `${redirection}/${encodeURIComponent(key)}`

    const qr = await QRCode.toDataURL(callback, {
      errorCorrectionLevel: 'M',
    })

    return await response.send({
      qr,
      raw: key,
      expiry: request.query.expiry ?? fastify.config.MY_SESSION_CODE_EXPIRY,
    })
  }
