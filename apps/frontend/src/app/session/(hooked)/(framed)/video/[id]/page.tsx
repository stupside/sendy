'use server'

import { NextPage } from 'next'

import Image from 'next/image'

import { sendy } from '@/tools/api'
import { tmdb } from '@/tools/api/tmdb'

import Preview from './_private/Preview'

const Page: NextPage<{
  params: { id: number }
}> = async (props) => {
  const { data: sendyData } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (sendyData?.handler !== 'movie') return null

  const { data: tmdbData } = await tmdb((c) =>
    c.GET('/3/find/{external_id}', {
      params: {
        path: {
          external_id: sendyData.metadata.ttid,
        },
        query: {
          external_source: 'imdb_id',
        },
      },
    }),
  )

  const movie = tmdbData?.movie_results?.[0]

  if (!movie) throw new Error('Movie not found')

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full bg-gradient-to-b from-black/90 via-black/60 to-black/90">
          <Image
            priority
            quality={10}
            width={1920}
            height={1080}
            alt={`Cover of ${movie.title}`}
            className="-z-10 absolute h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
        </div>
      </div>
      <div className="flex flex-grow max-md:flex-col-reverse max-md:justify-end gap-x-4 mb-5">
        <Preview
          id={props.params.id}
          cover={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
        <aside className="flex flex-col gap-y-4 max-md:mb-5">
          <header>
            <div className="flex gap-x-5 items-center">
              <h1 className="font-bold text-2xl">{movie.title}</h1>
              <div>
                <span className="px-2 py-1 rounded-md text-black bg-white text-xs font-semibold">
                  {/* {duration.hours}h {duration.minutes}m */}
                </span>
              </div>
            </div>
            <p className="font-light text-sm max-w-[48ch] mt-2">
              {movie.overview}
            </p>
          </header>
          <footer>
            {/* <ul>
              {Object.entries(media.peoples).map(([key, value]) => {
                const title = key.charAt(0).toUpperCase() + key.slice(1)

                return (
                  <li key={key} className="text-sm">
                    <span className="font-semibold mr-4">{title}</span>
                    <span className="font-light italic">
                      {value.join(', ')}
                    </span>
                  </li>
                )
              })}
            </ul> */}
          </footer>
        </aside>
      </div>
    </>
  )
}

export default Page
