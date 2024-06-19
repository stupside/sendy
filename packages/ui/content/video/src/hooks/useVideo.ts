'use client'

import { useContext } from 'react'

import { VideoContext } from 'src/contexts'

const useVideo = () => useContext(VideoContext)

export default useVideo
