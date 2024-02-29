'use client'

import { useContext } from 'react'

import HlsContext from '@/contexts/HlsContext'

const useHls = () => useContext(HlsContext)

export default useHls
