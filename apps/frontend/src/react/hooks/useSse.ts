'use client'

import { useContext, useEffect, useState } from 'react'

import { SseContext } from '../providers/Sse/Provider'

export type SseEventMap = {
  '/session/peer': { device: number }
  '/content/cast': {
    id: number
    type: string
    value: string
  }
}

type SseEvents = keyof SseEventMap

const useSseStatus = () => {
  const { source } = useContext(SseContext)

  const [connected, setConnected] = useState<boolean>(true)

  useEffect(() => {
    const onOpen = () => {
      setConnected(true)
    }

    const onError = () => {
      setConnected(false)
    }

    source?.addEventListener('open', onOpen)
    source?.addEventListener('error', onError)

    return () => {
      source?.removeEventListener('open', onOpen)
      source?.removeEventListener('error', onError)
    }
  }, [source])

  return connected
}

const useSseValue = <TEvent extends SseEvents>(event?: TEvent) => {
  const { source } = useContext(SseContext)

  const [data, setData] = useState<SseEventMap[TEvent]>()

  useEffect(() => {
    const onMessage = (message: MessageEvent<string>) => {
      setData(JSON.parse(message.data))
    }

    if (event) source?.addEventListener(event, onMessage)

    return () => {
      if (event) source?.removeEventListener(event, onMessage)
    }
  }, [source, event])

  return data
}

export { useSseValue, useSseStatus }
