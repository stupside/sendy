'use client'

import { useContext } from 'react'

import VideoHlsContext from 'src/contexts/VideoHlsContext'

const useVideoHls = () => useContext(VideoHlsContext)

export default useVideoHls
