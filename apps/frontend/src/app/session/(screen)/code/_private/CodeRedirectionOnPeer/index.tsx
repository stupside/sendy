'use client'

import { FC, useEffect } from 'react'

import { useSseValue } from '@/react/hooks'

import { redirection } from './action'

const CodeRedirectionOnPeer: FC = () => {
  const value = useSseValue('/session/peer')

  useEffect(() => {
    if (value) {
      redirection()
    }
  }, [value])

  return null
}

export default CodeRedirectionOnPeer
