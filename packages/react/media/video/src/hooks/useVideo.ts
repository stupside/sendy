'use client'

import { useContext } from 'react'

import { VideoContext } from '@/contexts'

const useVideo = () => {
  const { ref, player, url, title, subtitle } = useContext(VideoContext)

  return { ref, player, url, title, subtitle }
}

export default useVideo
