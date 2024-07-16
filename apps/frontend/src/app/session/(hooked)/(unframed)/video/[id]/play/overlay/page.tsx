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
import Link from 'next/link'
import { LanguageIcon } from '@heroicons/react/24/outline'
import { useVideo } from '@sendy/react-media-video'

const play = (id: number) => `/session/video/${id}/play`
const menu = (id: number) => `/session/video/${id}/play/overlay/menu`

const Page: NextPage<{ params: { id: number } }> = (props) => {
  const router = useRouter()

  const { title, subtitle } = useVideo()

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
        <header className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <h2 className="text-sm font-light">{subtitle}</h2>
          </div>
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
            <li>
              <Link href={menu(props.params.id)}>
                <button className="px-2 py-1 hover:text-black hover:bg-zinc-200 border-zinc-200 border-[1px] rounded-md">
                  <LanguageIcon className="w-6 h-6" />
                </button>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </FocusContext.Provider>
  )
}

export default Page
