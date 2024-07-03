import { FastifyInstance } from 'fastify'

import { Static } from '@sinclair/typebox'

import {
  Event,
  configurations,
  EventDynSchema,
} from '../../utils/typebox/event'

export const dispatch = <TEvent extends Event>(
  fastify: FastifyInstance,
  event: TEvent,
  params: {
    target: string
    payload: Static<(typeof configurations)[TEvent]>
  },
) => {
  return fastify.redis.publish(
    params.target,
    JSON.stringify({
      type: event,
      payload: params.payload,
    }),
  )
}

export const subscribe = async (params: {
  target: string
  fastify: FastifyInstance
  handle: (event: Static<typeof EventDynSchema>) => Promise<void>
}) => {
  const { sse } = params.fastify.redis

  const onMessage = async (channel: string, message: string) => {
    if (channel === params.target) {
      await params.handle(JSON.parse(message))
    }
  }

  await sse.subscribe(params.target)

  sse.on('message', onMessage)

  return async () => {
    sse.off('message', onMessage)

    return sse.unsubscribe(params.target)
  }
}
