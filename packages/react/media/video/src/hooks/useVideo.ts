'use client'

import { useContext } from 'react'

import { VideoContext } from '@/contexts'

const useVideo = () => {
  const { ref, player, url } = useContext(VideoContext)

  return { ref, player, url }
}

export default useVideo
