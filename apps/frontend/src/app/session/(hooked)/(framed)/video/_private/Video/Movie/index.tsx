'use server'

import { FC } from 'react'

import Image from 'next/image'

import { tmdb } from '@/tools/api/tmdb'
import { prettySeconds } from '@/tools/timestamp'

const Movie: FC<{
  date: number
  tmdbid: number
}> = async (props) => {
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

  const { hours, minutes } = prettySeconds((Date.now() - props.date) / 1000)

  return (
    <>
      <Image
        width={128}
        height={192}
        className="object-cover"
        alt={`Poster of ${data.title}`}
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      />
      <div className="absolute inset-0 px-3 py-2 flex flex-col justify-end bg-gradient-to-b from-black/5 via-black/10 to-black/90">
        <footer>
          <p className="text-xs font-light">
            {hours}h {minutes}m ago
          </p>
          <h1 className="font-extrabold text-xs mr-5">{data.title}</h1>
        </footer>
      </div>
    </>
  )
}

export default Movie
