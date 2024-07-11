'use server'

import { FC } from 'react'

import { tmdb } from '@/tools/api/tmdb'

import Default from '../Default'

const TmdbDetails: FC<{ id: number; ttid: string }> = async (props) => {
  const { data } = await tmdb((c) =>
    c.GET('/3/find/{external_id}', {
      params: {
        path: {
          external_id: props.ttid,
        },
        query: {
          external_source: 'imdb_id',
        },
      },
    }),
  )

  const movie = data?.movie_results?.[0]

  if (!movie) throw new Error('Movie not found')

  return (
    <Default
      id={props.id}
      title={movie.title ?? "Not provided"}
      overview={movie.overview ?? "No provided"}
      cover={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
      backdrop={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
    />
  )
}

export default TmdbDetails
