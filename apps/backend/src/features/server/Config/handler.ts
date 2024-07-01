import { MyRoute } from '../../../fastify'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  return response.send({
    code: {
      len: fastify.config.MY_SESSION_CODE_LEN,
    },
  })
}
