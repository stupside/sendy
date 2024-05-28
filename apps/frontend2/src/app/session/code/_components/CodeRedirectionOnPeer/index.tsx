'use client'

import { FC } from 'react'

import { useSse } from '@/ui/hooks'

import { redirection } from './action'

const CodeRedirectionOnPeer: FC = () => {
  useSse({
    connector: {
      event: '/session/peer',
      handler: redirection,
    },
  })

  return null
}

export default CodeRedirectionOnPeer
