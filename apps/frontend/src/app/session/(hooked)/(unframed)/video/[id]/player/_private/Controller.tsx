'use client'

import { ComponentProps, FC, PropsWithChildren, useMemo } from 'react'

import { HlsProvider } from '@sendy/react-media-video-hls'

const Controller: FC<PropsWithChildren> = (props) => {
  const config: ComponentProps<typeof HlsProvider>['config'] = useMemo(
    () => ({
      enableWebVTT: true,
      enableWorker: true,
      backBufferLength: 90,
    }),
    [],
  )

  return <HlsProvider config={config}>{props.children}</HlsProvider>
}

export default Controller
