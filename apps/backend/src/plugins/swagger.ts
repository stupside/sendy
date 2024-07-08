import fp from 'fastify-plugin'

import swagger from '@fastify/swagger'
import swaggerui from '@fastify/swagger-ui'

/**
 * This plugins adds swagger
 *
 * @see https://github.com/fastify/fastify-swagger
 */
const plugin = fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Sendy API',
        description: 'API Documentation',
        version: '0.1.0',
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
          url: fastify.config.BACKEND_URL,
          description: 'Sendy API',
        },
      ],
    },
  })

  await fastify.register(swaggerui, {
    routePrefix: '/doc',
  })
})

export default plugin
