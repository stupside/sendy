'use server'

import { NextPage } from 'next'

import { FC, PropsWithChildren } from 'react'

import { sendy } from '@/tools/api'

import Movie from './_private/Video/Movie'
import MediaLink from './_private/VideoLink'
import Listen from './_private/Listen'

const Page: NextPage<PropsWithChildren> = async (props) => {
  const { data } = await sendy((c) =>
    c.GET('/medias/history', {
      params: {
        query: {
          type: 'video',
        },
      },
    }),
  )

  if (!data?.length) return null

  return (
    <div className="flex flex-col flex-grow overflow-x-hidden p-8">
      <Listen>{props.children}</Listen>
      <footer>
        <header className="mb-2">
          <h1 className="font-black text-xl">History</h1>
        </header>
        <ul className="flex gap-x-3 w-max">
          {data.map((media) => {
            const Media: FC = () => {
              switch (media.handler) {
                case 'movie':
                  return <Movie date={media.date} itt={media.metadata.ttid} />
                default:
                  return null
              }
            }

            return (
              <li key={media.id}>
                <MediaLink id={media.id}>
                  <Media />
                </MediaLink>
              </li>
            )
          })}
        </ul>
      </footer>
    </div>
  )
}

export default Page
