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
      Value.Decode(EventSchema, {
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
  while (params.subscriber.closed === false) {
    const [, payload] = await params.subscriber.receive()

    if (payload) {
      await params.handle(
        Value.Decode(EventSchema, JSON.parse(payload.toString())),
      )
    }
  }
}
