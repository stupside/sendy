'use client'

import { useEffect, useRef, useState, type FC } from 'react'

import { useRouter } from 'next/navigation'

import { useSelectedLayoutSegment } from 'next/navigation'

import { ProviderStatus } from '@/react/providers/Sse'

import Timeline from './Timeline'

const play = (id: number) => `/session/video/${id}/play`

const Overlay: FC<{
  id: number
  actions: Array<FC>
}> = (props) => {
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const segment = useSelectedLayoutSegment()

  const [lastMove, setLastMove] = useState(0)

  useEffect(() => {
    const onTimout = () => {
      router.replace(play(props.id))
    }

    const timeout = setTimeout(onTimout, segment ? 25_000 : 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [router.replace, props.id, lastMove, segment])

  useEffect(() => {
    const onMouseMove = (e: HTMLElementEventMap['mousemove']) => {
      setLastMove(e.timeStamp)
    }

    ref.current?.addEventListener('mousemove', onMouseMove)

    return () => {
      ref.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [ref.current])

  return (
    <div
      ref={ref}
      className="fixed inset-0 flex flex-col justify-between p-8 bg-gradient-to-b from-black/90 via-black/45 to-black/90"
    >
      <header>
        <ProviderStatus />
      </header>
      <footer>
        <Timeline />
        <ul className="flex justify-center gap-x-3">
          {props.actions.map((Action, idx) => (
            <li key={idx}>
              <Action />
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}

export default Overlay
