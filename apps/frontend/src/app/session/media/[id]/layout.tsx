'use server'

import { NextPage } from 'next'

import Image from 'next/image'

import { ReactNode } from 'react'

import { MakeReq } from '@/tools/api'
import { getMockedContents } from '@/tools/mock'
import { prettySeconds } from '@/tools/timestamp'

import Preview from './_private/Preview'

const Layout: NextPage<{
  cast: ReactNode
  params: { id: number }
}> = async (props) => {
  const { data } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  const media = (await getMockedContents()).at(props.params.id)!

  const duration = prettySeconds(media.duration)

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full bg-gradient-to-b from-black via-black/60 to-black">
          {props.cast}
          <Image
            fill
            src={media.image.cover}
            className="-z-10 object-cover"
            alt={`Cover of ${media.title}`}
          />
        </div>
      </div>
      <div className="flex flex-grow gap-x-6 items-center mt-8 mb-5">
        <Preview cover={media.image.cover} />
        <aside>
          <header className="flex gap-x-5 items-center">
            <h1 className="font-bold text-2xl">{media.title}</h1>
            <div>
              <span className="px-2 py-1 rounded-md text-black bg-white text-xs font-semibold">
                {duration.hours}h {duration.minutes}m
              </span>
            </div>
          </header>
          <div className="mt-3 mb-8">
            <p className="font-light text-sm max-w-[48ch]">
              {media.description}
            </p>
          </div>
          <footer>
            <ul>
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
            </ul>
          </footer>
        </aside>
      </div>
    </>
  )
}

export default Layout
