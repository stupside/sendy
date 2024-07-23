'use server'

import { NextPage } from 'next'

import { FC, PropsWithChildren } from 'react'

import { sendy } from '@/tools/api'

import Listen from './_private/Listen'

import Movie from './_private/VideoLink/Movie'

const Layout: NextPage<PropsWithChildren> = async (props) => {
  const { data } = await sendy((c) =>
    c.GET('/medias/history', {
      params: {
        query: {
          type: 'video',
        },
      },
    }),
  )

  return (
    <div className="flex flex-col flex-grow overflow-x-hidden m-8">
      <div className="my-auto mx-3">
        <Listen>{props.children}</Listen>
      </div>
      <footer>
        <header className="mb-3">
          <h1 className="font-black text-xl">History</h1>
        </header>
        <ul className="flex gap-x-3">
          {data?.map((media) => {
            const Link: FC = () => {
              switch (media.handler) {
                case 'movie':
                  return (
                    <Movie
                      id={media.id}
                      date={media.date}
                      tmdbid={media.metadata.tmdbid}
                    />
                  )
                default:
                  return null
              }
            }

            return (
              <li key={media.id}>
                <Link />
              </li>
            )
          })}
        </ul>
      </footer>
    </div>
  )
}

export default Layout
