'use client'

import { useEffect, useRef, useState } from 'react'

import { NextPage } from 'next'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSelectedLayoutSegment } from 'next/navigation'

import { LanguageIcon } from '@heroicons/react/24/outline'

import { useVideo } from '@sendy/react-media-video'
import { useFocusable, FocusContext } from '@sendy/react-spatial'

import { ProviderStatus } from '@/react/providers/Sse'

import Timeline from './_private/Timeline'

import Fullscreen from './_private/Actions/Fullscreen'
import PictureInPicture from './_private/Actions/PictureInPicture'

const play = (id: number) => `/session/video/${id}/play`
const menu = (id: number) => `/session/video/${id}/play/overlay/audios`

const Page: NextPage<{ params: { id: number } }> = (props) => {
  const router = useRouter()

  const { title, subtitle } = useVideo()

  const { ref, focusKey } = useFocusable({
    forceFocus: true,
    isFocusBoundary: true,
  })

  const timeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const onEvent = () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        router.replace(play(props.params.id))
      }, 5000)
    }

    ref.current?.addEventListener('keypress', onEvent)
    ref.current?.addEventListener('mousemove', onEvent)

    return () => {
      clearTimeout(timeout.current)

      ref.current?.removeEventListener('keypress', onEvent)
      ref.current?.removeEventListener('mousemove', onEvent)
    }
  }, [ref.current, router, props.params.id, timeout.current, play])

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
          <ul className="flex justify-center gap-x-3 my-4">
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
