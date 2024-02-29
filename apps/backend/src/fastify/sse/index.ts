import { FastifyInstance } from 'fastify'

export type TargetEvent<TData> = {
  type: string
  data: TData
}

export const dispatch = <
  TEvent,
  TTargetEvent extends TargetEvent<TEvent>,
>(params: {
  target: string
  event: TTargetEvent
  fastify: FastifyInstance
}) => {
  const { sse } = params.fastify.redis

  return sse.publish(params.target, JSON.stringify(params.event))
}

export const subscribe = async (params: {
  target: string
  fastify: FastifyInstance
  handle: (event: TargetEvent<never>) => Promise<void>
}) => {
  const { sse } = params.fastify.redis

  const onMessage = async (channel: string, message: string) => {
    if (channel === params.target) {
      await params.handle(JSON.parse(message) as TargetEvent<never>)
    }
  }

  await sse.subscribe(params.target)

  sse.on('message', onMessage)

  return async () => {
    sse.off('message', onMessage)

    return sse.unsubscribe(params.target)
  }
}
