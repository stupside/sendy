'use client'

import {
  type FC,
  type PropsWithChildren,
  useRef,
  type ComponentProps,
} from 'react'

import { VideoContext } from 'src/contexts'

import { Controller, type ControllerFeatures } from './Controller'

const Video: FC<PropsWithChildren<{ url: string }>> = ({ url, children }) => {
  const player = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  return (
    <div id="player" ref={player} className="relative flex flex-grow bg-black">
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

type IVideoController = Omit<
  ComponentProps<typeof Controller>,
  'features' | 'children'
> & {
  features: ControllerFeatures<boolean>
}

const VideoController: FC<IVideoController> = ({
  title,
  features: {
    display = {
      pip: true,
      fullscreen: true,
    },
  },
}) => {
  return (
    <Controller
      title={title}
      features={{
        display,
        quality: {
          Provider: undefined,
        },
        language: {
          Audio: undefined,
          Subtitle: undefined,
        },
      }}
    />
  )
}

export { Video, Controller, VideoController, type IVideoController }
