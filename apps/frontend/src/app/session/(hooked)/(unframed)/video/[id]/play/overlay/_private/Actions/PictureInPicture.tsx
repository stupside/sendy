'use client'

import { FC } from 'react'

import { useVideoPip } from '@sendy/react-media-video'

import Button from '@/react/components/buttons/Button'

const PictureInPicture: FC = () => {
  const { toggle } = useVideoPip()

  return (
    <Button title="Picture in Picture" handle={toggle}>
      Picture in Picture
    </Button>
  )
}

export default PictureInPicture
