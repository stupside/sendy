'use client'

import { FC } from 'react'

import { useVideoFullscreen } from '@sendy/ui-content-video'

import Button from '@/react/components/buttons/Button'

const Fullscreen: FC = () => {
  const { toggle } = useVideoFullscreen()

  return (
    <Button title="Fullscreen" handle={toggle}>
      Fullscreen
    </Button>
  )
}

export default Fullscreen
