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
import Play from './_private/Timeline/Play'
import Action from './_private/Actions/Action'

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
      }, 25_000)
    }

    ref.current?.addEventListener('keypress', onEvent)
    ref.current?.addEventListener('mousemove', onEvent)
    ref.current?.addEventListener('touchstart', onEvent)

    return () => {
      clearTimeout(timeout.current)

      ref.current?.removeEventListener('keypress', onEvent)
      ref.current?.removeEventListener('mousemove', onEvent)
      ref.current?.removeEventListener('touchstart', onEvent)
    }
  }, [ref.current, router, props.params.id, timeout.current, play])

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col justify-between px-16 py-12 bg-gradient-to-b from-black/90 via-black/45 to-black/90"
      >
        <header className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <h2 className="text-sm font-light">{subtitle}</h2>
          </div>
          <ProviderStatus />
        </header>
        <footer>
          <div className="flex justify-end my-3 gap-x-3">
            <ul className="flex gap-x-3 p-1 bg-zinc-800/50 rounded-md">
              <li>
                <Action.Link title={'Languages'} href={menu(props.params.id)}>
                  <LanguageIcon className="h-6 w-6" />
                </Action.Link>
              </li>
            </ul>
            <ul className="flex gap-x-3 p-1 bg-zinc-800/50 rounded-md">
              <li>
                <Fullscreen />
              </li>
              <li>
                <PictureInPicture />
              </li>
            </ul>
          </div>
          <Timeline />
        </footer>
      </div>
    </FocusContext.Provider>
  )
}

export default Page
