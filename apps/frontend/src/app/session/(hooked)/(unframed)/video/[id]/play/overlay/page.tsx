'use client'

import { NextPage } from 'next'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { useSelectedLayoutSegment } from 'next/navigation'

import { useFocusable, FocusContext } from '@sendy/react-spatial'

import { ProviderStatus } from '@/react/providers/Sse'

import Timeline from './_private/Timeline'

import Fullscreen from './_private/Actions/Fullscreen'
import PictureInPicture from './_private/Actions/PictureInPicture'

const play = (id: number) => `/session/video/${id}/play`

const Page: NextPage<{ params: { id: number } }> = (props) => {
  const router = useRouter()

  const { ref, focusKey } = useFocusable({
    isFocusBoundary: true,
  })

  const segment = useSelectedLayoutSegment()

  const [lastMove, setLastMove] = useState(0)

  useEffect(() => {
    const onTimout = () => {
      router.replace(play(props.params.id))
    }

    const timeout = setTimeout(onTimout, segment ? 25_000 : 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [props.params.id, lastMove, segment])

  useEffect(() => {
    const onEvent = (e: Event) => {
      setLastMove(e.timeStamp)
    }

    ref.current?.addEventListener('keypress', onEvent)
    ref.current?.addEventListener('mousemove', onEvent)

    return () => {
      ref.current?.removeEventListener('keypress', onEvent)
      ref.current?.removeEventListener('mousemove', onEvent)
    }
  }, [ref.current])

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-b from-black/90 via-black/45 to-black/90"
      >
        <header className="flex justify-end">
          <ProviderStatus />
        </header>
        <footer>
          <Timeline />
          <ul className="flex justify-center gap-x-3">
            <li>
              <Fullscreen />
            </li>
            <li>
              <PictureInPicture />
            </li>
          </ul>
        </footer>
      </div>
    </FocusContext.Provider>
  )
}

export default Page
