import { Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Publisher, Subscriber } from 'zeromq'

import {
  EventSchema,
  EventSchemas,
  type Event,
} from '../../utils/typebox/event'

export const dispatch = <TEvent extends Event>({
  event,
  params,
  publisher,
}: {
  event: TEvent
  publisher: Publisher
  params: {
    target: string
    metadata: Static<(typeof EventSchemas)[TEvent]>
  }
}) => {
  return publisher.send([
    params.target,
    JSON.stringify(
      Value.Cast(EventSchema, {
        event,
        metadata: params.metadata,
      }),
    ),
  ])
}

export const subscribe = async (params: {
  target: string
  subscriber: Subscriber
  handle: (event: Static<typeof EventSchema>) => Promise<void>
}) => {
  for await (const [target, payload] of params.subscriber) {
    if (target?.toString() !== params.target) throw new Error('Invalid target.')

    if (payload) {
      await params.handle(
        Value.Decode(EventSchema, JSON.parse(payload.toString())),
      )
    }

    if (params.subscriber.closed) break
  }
}
