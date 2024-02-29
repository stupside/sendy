import { MediaType } from '@prisma/client'
import { Type } from '@sinclair/typebox'

const SessionPeerSchema = Type.Object({
  device: Type.Integer({
    description: 'The id of the device.',
  }),
})

const MediaCastSchema = Type.Object({
  id: Type.Integer({
    description: 'The id of the media.',
  }),
  type: Type.Enum(MediaType, {
    description: 'The type of the media.',
  }),
})

const EventSchemas = {
  '/media/cast': MediaCastSchema,
  '/session/peer': SessionPeerSchema,
}

type Event = keyof typeof EventSchemas

const EventSchema = Type.Union(
  Object.entries(EventSchemas).map(([event, schema]) =>
    Type.Object({
      metadata: schema,
      event: Type.Literal(event),
    }),
  ),
)

export type { Event }
export { EventSchema, EventSchemas }
