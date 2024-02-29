'use client'

import { FC } from 'react'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import Action from './Actions/Action'

import { useVideoPip } from '@sendy/react-media-video'

const PictureInPicture: FC = () => {
  const { toggle } = useVideoPip()

  return (
    <Action title="Picture in Picture" handle={toggle}>
      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
    </Action>
  )
}

export default PictureInPicture
