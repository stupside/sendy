'use client'

import { FC, PropsWithChildren } from 'react'

import { HlsProvider } from '@sendy/ui-content-video-hls'

const Controller: FC<PropsWithChildren<{ type: string }>> = (props) => {
  switch (props.type) {
    case 'm3u8': {
      return (
        <HlsProvider
          config={{
            enableWorker: true,
            autoStartLoad: true,
            lowLatencyMode: true,
            backBufferLength: 90,
          }}
        >
          {props.children}
        </HlsProvider>
      )
    }
    default:
      return props.children
  }
}

export default Controller
