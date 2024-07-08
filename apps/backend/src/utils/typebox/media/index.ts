import { Type } from '@sinclair/typebox'
import { MediaType } from '@prisma/client'

const DefaultMetadata = Type.Object({})

const DefaultHandlerSchema = Type.Object({
  metadata: DefaultMetadata,
  handler: Type.Literal('default'),
})

const TextHandlerSchema = Type.Union([
  Type.Object({
    metadata: Type.Object({
      sensitive: Type.Boolean({
        description: 'Whether the text is sensitive or not.',
      }),
    }),
    handler: Type.Literal('default'),
  }),
])

const VideoHandlerSchema = Type.Union([
  Type.Object({
    metadata: DefaultMetadata,
    handler: Type.Literal('default'),
  }),
  Type.Object({
    metadata: Type.Object({
      ttid: Type.String({
        description: 'The ttid of the movie.',
      }),
    }),
    handler: Type.Literal('movie'),
  }),
  Type.Object({
    metadata: Type.Object({
      ttid: Type.String({
        description: 'The ttid of the serie.',
      }),
    }),
    handler: Type.Literal('serie'),
  }),
])

const MediaTypeSchemas = {
  [MediaType.text]: TextHandlerSchema,
  [MediaType.video]: VideoHandlerSchema,
  [MediaType.image]: Type.Union([DefaultHandlerSchema]),
  [MediaType.audio]: Type.Union([DefaultHandlerSchema]),
}

const MediaSchema = Type.Union(
  Object.entries(MediaTypeSchemas).map(([type, schema]) =>
    Type.Intersect([
      Type.Object({
        type: Type.Literal(type as keyof typeof MediaTypeSchemas),
      }),
      schema,
    ]),
  ),
)

export { MediaSchema }
