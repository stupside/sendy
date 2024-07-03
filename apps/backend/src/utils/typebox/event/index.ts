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

const EventDynSchema = Type.Union(
  Object.keys(configurations).map((key) => {
    const schema = configurations[key as Event]

    return Type.Object({
      payload: schema,
      type: Type.Literal(key as Event, {
        description: `The type of the event.`,
      }),
    })
  }),
)

export type { Event }
export { EventDynSchema, configurations }
