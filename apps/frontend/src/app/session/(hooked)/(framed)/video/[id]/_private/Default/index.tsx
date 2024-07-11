'use server'

import { FC } from 'react'

import Image from 'next/image'

import Preview from './Preview'

const Default: FC<{
  id: number
  title: string
  cover?: string
  overview: string
  backdrop?: string
}> = (props) => {
  return (
    <>
      {props.backdrop && (
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full bg-gradient-to-b from-black/90 via-black/60 to-black/90">
            <Image
              priority
              quality={10}
              width={1920}
              height={1080}
              alt={`Backdrop of ${props.title}`}
              className="-z-10 absolute h-full object-cover"
              src={props.backdrop}
            />
          </div>
        </div>
      )}
      <div className="flex flex-grow max-md:flex-col-reverse max-md:justify-end gap-x-4 mb-5">
        {props.cover && <Preview id={props.id} cover={props.cover} />}
        <aside className="flex flex-col gap-y-4 max-md:mb-5">
          <header>
            <div className="flex gap-x-5 items-center">
              <h1 className="font-bold text-2xl">{props.title}</h1>
              <div>
                <span className="px-2 py-1 rounded-md text-black bg-white text-xs font-semibold">
                  {/* {duration.hours}h {duration.minutes}m */}
                </span>
              </div>
            </div>
            <p className="font-light text-sm max-w-[48ch] mt-2">
              {props.overview}
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

export default Default
