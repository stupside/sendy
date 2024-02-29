import { FastifyInstance } from 'fastify'

export const USER_CHANNEL = (session: { id: number }) => `user:${session.id}`

export type UserEvent<TData> = {
  type: string
  data: TData
}

export const dispatch = <
  TEvent,
  TSessionEvent extends UserEvent<TEvent>,
>(params: {
  session: number
  event: TSessionEvent
  fastify: FastifyInstance
}) => {
  const { myproducer } = params.fastify.redis

  if (myproducer === undefined) {
    throw new Error('Redis producer is not available')
  }

  return myproducer.publish(
    USER_CHANNEL({ id: params.session }),
    JSON.stringify(params.event),
  )
}

export const subscribe = async (params: {
  user: number
  fastify: FastifyInstance
  handle: (event: UserEvent<never>) => Promise<void>
}) => {
  const it = USER_CHANNEL({ id: params.user })

  const { myconsumer } = params.fastify.redis

  if (myconsumer === undefined) {
    throw new Error('Redis consumer is not available')
  }

  await myconsumer.subscribe(it)

  const onMessage = async (channel: string, message: string) => {
    if (channel === it) {
      await params.handle(JSON.parse(message) as UserEvent<never>)
    }
  }

  myconsumer.on('message', onMessage)

  return async () => {
    myconsumer.off('message', onMessage)

    await myconsumer.unsubscribe(it)
  }
}
