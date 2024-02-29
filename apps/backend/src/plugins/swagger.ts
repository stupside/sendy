import swagger from '@fastify/swagger'
import swaggerui from '@fastify/swagger-ui'

import fp from 'fastify-plugin'

/**
 * This plugins adds swagger
 *
 * @see https://github.com/fastify/fastify-swagger
 */
const plugin = fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        version: '0.1.0',
        title: 'Sendy API',
        description: 'API Documentation',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      servers: [
        {
          description: 'Sendy API',
          url: fastify.config.BACKEND_URL,
        },
      ],
    },
  })

  await fastify.register(swaggerui, {
    routePrefix: '/doc',
  })
})

export default plugin
