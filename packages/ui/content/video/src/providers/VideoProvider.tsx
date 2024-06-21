'use client'

import { type FC, type PropsWithChildren, useRef } from 'react'

import { VideoContext } from '@/contexts'

const VideoProvider: FC<PropsWithChildren<{ url: string }>> = ({
  url,
  children,
}) => {
  const player = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  return (
    <div id="player" ref={player} className="relative">
      <video src={url} className="mx-auto" ref={video} />
      <VideoContext.Provider
        value={{
          url,
          video,
          player,
        }}
      >
        {children}
      </VideoContext.Provider>
    </div>
  )
}

export default VideoProvider
