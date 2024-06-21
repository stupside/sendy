'use server'

import { NextPage } from 'next'

import Image from 'next/image'

import { MakeReq } from '@/tools/api'
import { getMockedContents } from '@/tools/mock'
import { prettySeconds } from '@/tools/timestamp'

import Preview from './_private/Preview'

const Page: NextPage<{
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
        <div className="relative h-full bg-gradient-to-b from-black/90 via-black/60 to-black/90">
          <Image
            priority
            quality={10}
            width={1920}
            height={1080}
            src={media.image.cover}
            className="-z-10 absolute h-full object-cover"
            alt={`Cover of ${media.title}`}
          />
        </div>
      </div>
      <div className="flex flex-grow max-md:flex-col-reverse max-md:justify-end gap-x-4 mb-5">
        <Preview id={props.params.id} cover={media.image.cover} />
        <aside className="flex flex-col gap-y-4 max-md:mb-5">
          <header>
            <div className="flex gap-x-5 items-center">
              <h1 className="font-bold text-2xl">{media.title}</h1>
              <div>
                <span className="px-2 py-1 rounded-md text-black bg-white text-xs font-semibold">
                  {duration.hours}h {duration.minutes}m
                </span>
              </div>
            </div>
            <p className="font-light text-sm max-w-[48ch] mt-2">
              {media.description}
            </p>
          </header>
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

export default Page
