import { TObject, Type } from '@sinclair/typebox'

import { MediaType } from '@prisma/client'

const DefaultMetadata = Type.Object({})

type MediaDynConfiguration = {
  handler: string
  metadata: TObject
}

type MediaDynConfigurationVersion = number

const configurations: Record<
  MediaType,
  Record<MediaDynConfigurationVersion, Array<MediaDynConfiguration>>
> = {
  [MediaType.image]: {
    0: [
      {
        handler: 'default',
        metadata: DefaultMetadata,
      },
    ],
  },
  [MediaType.audio]: {
    0: [
      {
        handler: 'default',
        metadata: DefaultMetadata,
      },
    ],
  },
  [MediaType.video]: {
    0: [
      {
        handler: 'default',
        metadata: DefaultMetadata,
      },
      {
        handler: 'movie',
        metadata: Type.Object({
          ttid: Type.String({
            description: 'The ttid of the movie.',
          }),
        }),
      },
      {
        handler: 'serie',
        metadata: Type.Object({
          ttid: Type.String({
            description: 'The ttid of the serie.',
          }),
        }),
      },
    ],
  },
  [MediaType.text]: {
    0: [
      {
        handler: 'default',
        metadata: Type.Object({
          sensitive: Type.Boolean({
            description: 'Should the text be hidden when casted',
          }),
        }),
      },
      {
        handler: 'link',
        metadata: Type.Object({
          iframe: Type.Boolean({
            description: 'Should the link be rendered as an iframe',
          }),
        }),
      },
    ],
  },
}

const MediaSchema = (type: MediaType) => {
  return Object.entries(configurations[type]).flatMap(
    ([version, configurations]) => {
      return configurations.map(({ handler, metadata }) =>
        Type.Object(
          {
            value: Type.String({
              description: 'The value of the media.',
            }),
            type: Type.Literal(type, {
              description: 'The type of the media.',
            }),
            handler: Type.Literal(handler, {
              description: 'How the media should be handled.',
            }),
            metadata: Type.Composite([
              metadata,
              Type.Object({
                version: Type.Literal(Number.parseInt(version), {
                  description: 'The version of the configuration.',
                }),
              }),
            ]),
          },
          {
            description: `The definition of a ${type} media with the ${handler} handler (version ${version}).`,
          },
        ),
      )
    },
  )
}

const MediaDynSchema = Type.Union(
  Object.values(MediaType).flatMap(MediaSchema),
  {
    description: 'The definition of a media.',
  },
)

export { MediaDynSchema }
