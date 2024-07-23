'use client'

import { FC } from 'react'

import Image from 'next/image'

import Action from './Action'

type Department = string
type DepartmentPeople = Array<{
  name: string
  character: string
}>

const VideoDetails: FC<{
  id: number
  title: string
  overview: string
  duration: string
  backdrop?: string
  credits: Record<Department, DepartmentPeople>
}> = (props) => {
  return (
    <>
      {props.backdrop && (
        <div className="relative -z-10">
          <div className="fixed inset-0">
            <div className="relative h-full bg-gradient-to-b from-black/90 via-black/60 to-black/90">
              <Image
                priority
                quality={35}
                width={1920}
                height={1080}
                src={props.backdrop}
                alt={`Backdrop of ${props.title}`}
                className="-z-10 absolute h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-6 mb-5">
        <div className="flex gap-x-5 items-center">
          <h1 className="font-bold text-2xl">{props.title}</h1>
          <div>
            <span className="px-2 py-1 rounded-md text-black bg-white text-xs font-semibold">
              {props.duration}
            </span>
          </div>
        </div>
        <p className="font-light text-sm text-pretty line-clamp-4 max-w-prose">
          {props.overview}
        </p>
        <ul className="flex gap-x-3">
          <li className="inline-block">
            <Action redirection={`/session/video/${props.id}/player`}>
              Watch
            </Action>
          </li>
        </ul>
        {/* <footer>
            <ul>
              {Object.entries(props.credits).map(([key, value]) => {
                const title = key.charAt(0).toUpperCase() + key.slice(1)

                return (
                  <li key={key} className="text-sm">
                    <span className="font-semibold mr-4">{title}</span>
                    <span className="font-light italic">
                      {value.map(({ name }) => name).join(', ')}
                    </span>
                  </li>
                )
              })}
            </ul>
          </footer> */}
      </div>
    </>
  )
}

export default VideoDetails
