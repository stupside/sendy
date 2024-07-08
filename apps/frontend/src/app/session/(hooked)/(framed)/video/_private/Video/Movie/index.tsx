'use server'

import { FC } from 'react'

import Image from 'next/image'

import { tmdb } from '@/tools/api/tmdb'
import { prettySeconds } from '@/tools/timestamp'

const Movie: FC<{
  itt: string
  date: number
}> = async (props) => {
  const { data } = await tmdb((c) =>
    c.GET('/3/find/{external_id}', {
      params: {
        path: {
          external_id: props.itt,
        },
        query: {
          external_source: 'imdb_id',
        },
      },
    }),
  )

  if (data === undefined) throw new Error("TMDB didn't return any data")

  const movie = data.movie_results?.[0]

  if (movie === undefined) throw new Error("TMDB didn't return any movie")

  const age = prettySeconds(Date.now() - props.date)

  return (
    <>
      <Image
        width={120}
        height={180}
        alt={`Poster of ${movie.title}`}
        src={`https://image.tmdb.org/t/p/w120${movie.poster_path}`}
      />
      <div className="absolute inset-0 flex flex-col justify-between px-3 py-2 bg-gradient-to-b from-zinc-900 via-zinc-900/10 to-zinc-900">
        <header>
          <p className="text-xs font-light">
            {age.hours}h {age.minutes}m ago
          </p>
        </header>
        <footer>
          <h1 className="font-extrabold text-xs mr-5">{movie.title}</h1>
        </footer>
      </div>
    </>
  )
}

export default Movie
