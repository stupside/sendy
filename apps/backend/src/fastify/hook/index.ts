import { Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import {
  type Event,
  EventSchema,
  EventSchemas,
} from '../../utils/typebox/event'
import { Publisher, Subscriber } from 'zeromq'

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
  const _receive = async () => {
    const [, payload] = await params.subscriber.receive()

    if (params.subscriber.closed) {
      return
    }

    if (payload) {
      await params.handle(
        Value.Decode(EventSchema, JSON.parse(payload.toString())),
      )
    }

    _receive()
  }

  _receive()
}
