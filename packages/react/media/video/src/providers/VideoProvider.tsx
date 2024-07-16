'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { VideoContext } from '@/contexts'

const VideoProvider: FC<
  PropsWithChildren<{ url: string; title: string; subtitle: string }>
> = (props) => {
  const ref = useRef<HTMLVideoElement>(null)
  const player = useRef<HTMLDivElement>(null)

  return (
    <>
      <video ref={ref} src={props.url} className="m-auto aspect-video h-full" />
      <div ref={player} className="relative contents">
        <VideoContext.Provider
          value={{
            ref,
            player,
            url: props.url,
            title: props.title,
            subtitle: props.subtitle,
          }}
        >
          {props.children}
        </VideoContext.Provider>
      </div>
    </>
  )
}

export default VideoProvider
