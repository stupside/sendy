'use server'

import { FC } from 'react'

import VideoLink from '..'

import { tmdb } from '@/tools/api/tmdb'

const MovieLink: FC<{ id: number; date: number; tmdbid: number }> = async (
  props,
) => {
  const { data } = await tmdb((c) =>
    c.GET('/3/movie/{movie_id}', {
      params: {
        path: {
          movie_id: props.tmdbid,
        },
        query: {},
      },
    }),
  )

  if (!data) throw new Error('No data')

  return (
    <VideoLink
      id={props.id}
      date={props.date}
      title={data.title ?? 'No title'}
      poster={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
    />
  )
}

export default MovieLink
