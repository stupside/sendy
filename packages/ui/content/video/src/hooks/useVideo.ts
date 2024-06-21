'use client'

import { useContext } from 'react'

import { VideoContext } from '@/contexts'

const useVideo = () => {
  const { video, player, url } = useContext(VideoContext)

  return {
    url,
    video,
    player,
  }
}

export default useVideo
