import { MediaType } from '@prisma/client'
import { Type } from '@sinclair/typebox'

type Event = '/session/peer' | '/media/cast'

const configurations = {
  '/session/peer': Type.Object({
    device: Type.Integer({
      description: 'The id of the device.',
    }),
  }),
  '/media/cast': Type.Object({
    id: Type.Integer({
      description: 'The id of the media.',
    }),
    type: Type.Enum(MediaType, {
      description: 'The type of the media.',
    }),
  }),
}

const EventSchema = (type: Event) =>
  Type.Object({
    payload: configurations[type],
    type: Type.Literal(type, {
      description: `The type of the event.`,
    }),
  })

const EventDynSchema = Type.Union(
  (Object.keys(configurations) as Array<Event>).map(EventSchema),
)

export type { Event }
export { EventDynSchema, configurations }
