'use server'

import { ComponentProps, FC } from 'react'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { tmdb } from '@/tools/api/tmdb'

import Default from '../Default'
import { prettySeconds } from '@/tools/timestamp'

const TmdbPeople = Type.Object({
  name: Type.String(),
  character: Type.Optional(Type.String()),
})

const TmdbCredits = Type.Object({
  cast: Type.Array(TmdbPeople),
  crew: Type.Array(TmdbPeople),
})

// const TmdbImage = Type.Object({
//   file_path: Type.String(),
//   vote_count: Type.Number(),
//   vote_average: Type.Number(),
// })

// const TmdbImages = Type.Object({
//   logos: Type.Array(TmdbImage),
//   posters: Type.Array(TmdbImage),
//   backdrops: Type.Array(TmdbImage),
// })

const TmdbDetails: FC<{ id: number; tmdbid: number }> = async (props) => {
  const { data } = await tmdb((c) =>
    c.GET('/3/movie/{movie_id}', {
      params: {
        path: {
          movie_id: props.tmdbid,
        },
        query: {
          append_to_response: 'credits',
        },
      },
    }),
  )

  if (!data) throw new Error('No data')

  const credits: ComponentProps<typeof Default>['credits'] = {}

  if ('credits' in data) {
    Object.entries(Value.Decode(TmdbCredits, data.credits)).forEach(
      ([key, value]) => {
        credits[key] = value.slice(0, 5).map(({ name, character }) => ({
          name: name,
          character: character ?? 'Not provided',
        }))
      },
    )
  }

  const { hours, minutes } = prettySeconds((data.runtime ?? 0) * 60)

  return (
    <Default
      id={props.id}
      credits={credits}
      duration={`${hours}h ${minutes}m`}
      title={data?.title ?? 'Not provided'}
      overview={data?.overview ?? 'Not provided'}
      backdrop={`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`}
    />
  )
}

export default TmdbDetails
