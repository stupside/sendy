'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'

import { NextPage } from 'next'

import { useRouter } from 'next/navigation'

import { Cog6ToothIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { useVideo } from '@sendy/react-media-video'
import { useFocusable, FocusContext } from '@sendy/react-spatial'

import { ProviderStatus } from '@/react/providers/Sse'

import Timeline from './_private/Timeline'

import Fullscreen from './_private/Fullscreen'
import PictureInPicture from './_private/PictureInPicture'

import Play from './_private/Play'

import Action from './_private/Actions/Action'

const player = (id: number) => `/session/video/${id}/player`
const settings = (id: number) => `/session/video/${id}/player/overlay/settings`

const Page: NextPage<PropsWithChildren<{ params: { id: number } }>> = (
  props,
) => {
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
        router.replace(player(props.params.id))
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
  }, [ref.current, router, props.params.id, timeout.current, player])

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col px-16 py-12 bg-gradient-to-b from-black/90 via-black/65 to-black/90"
      >
        <header className="flex justify-end">
          <ProviderStatus />
        </header>
        <div className="flex flex-grow justify-center items-center">
          <div>
            <Play
              icons={{
                paused: <PauseIcon className="w-9 h-9 m-3" />,
                resumed: <PlayIcon className="w-9 h-9 m-3" />,
              }}
            />
          </div>
          <div></div>
        </div>
        <footer>
          <div className="flex justify-between mt-5 mb-4">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <h2 className="text-sm font-light">{subtitle}</h2>
            </div>
            <ul className="flex gap-x-2">
              <li>
                <Action.Link
                  title={'Settings'}
                  href={settings(props.params.id)}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </Action.Link>
              </li>
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
