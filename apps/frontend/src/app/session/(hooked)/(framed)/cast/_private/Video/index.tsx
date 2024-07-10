'use client'

import { FC } from 'react'

import Image from 'next/image'

const Movie: FC<{
  date: string
  title: string
  poster: string
  type: 'movie' | 'serie' | 'tv'
}> = async (props) => {
  return (
    <>
      <Image
        width={120}
        height={180}
        alt={`Poster of ${props.title}`}
        src={`https://image.tmdb.org/t/p/w342${props.poster}`}
      />
      <div className="absolute inset-0 flex flex-col justify-between px-3 py-2 bg-gradient-to-b from-zinc-900 via-zinc-900/10 to-zinc-900">
        <header></header>
        <footer>
          <h1 className="font-extrabold text-xs mr-5">{props.title}</h1>
        </footer>
      </div>
    </>
  )
}

export default Movie
