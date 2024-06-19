'use client'

import { type FC } from 'react'

import { Button } from '@sendy/ui-interactible'

import { useVideoFullscreen, useVideoPip } from 'src/hooks'

const Display: FC<{
  features: Partial<{
    pip: boolean
    fullscreen: boolean
  }>
}> = ({ features: { pip, fullscreen } }) => {
  const { toggle: togglePip } = useVideoPip()
  const { enabled, toggle: toggleFullscreen } = useVideoFullscreen()

  return (
    <>
      {fullscreen && (
        <Button title="Fullscreen" handle={toggleFullscreen}>
          {enabled ? <>Fullscreen</> : <>Windowed</>}
        </Button>
      )}
      {pip && (
        <Button title="Picture in Picture" handle={togglePip}>
          Picture in Picture
        </Button>
      )}
    </>
  )
}

export default Display
