'use client'

import { FC } from 'react'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { useVideoPip } from '@sendy/react-media-video'

import Action from './Action'

const PictureInPicture: FC = () => {
  const { toggle } = useVideoPip()

  return (
    <Action title="Picture in Picture" handle={toggle}>
      <ArrowTopRightOnSquareIcon className="w-6 h-6" />
    </Action>
  )
}

export default PictureInPicture
