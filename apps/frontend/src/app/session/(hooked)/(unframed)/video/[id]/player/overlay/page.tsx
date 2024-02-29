'use client'

import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import { use, useEffect, useRef } from 'react'

import { Cog6ToothIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import Action from './_private/Actions/Action'
import Fullscreen from './_private/Fullscreen'
import PictureInPicture from './_private/PictureInPicture'
import Play from './_private/Play'

import { useVideo } from '@sendy/react-media-video'

const player = (id: number) => `/session/video/${id}/player`
const settings = (id: number) => `/session/video/${id}/player/overlay/settings`

const Page: NextPage<{ params: Promise<{ id: number }> }> = (props) => {
  const router = useRouter()

  const { title, subtitle } = useVideo()

  const params = use(props.params)

  const timeout = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    const onEvent = () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        router.replace(player(params.id))
      }, 25_000)
    }

    document.addEventListener('keypress', onEvent)
    document.addEventListener('mousemove', onEvent)
    document.addEventListener('touchstart', onEvent)

    return () => {
      clearTimeout(timeout.current)

      document.removeEventListener('keypress', onEvent)
      document.removeEventListener('mousemove', onEvent)
      document.removeEventListener('touchstart', onEvent)
    }
  }, [router, params, timeout.current])

  return (
    <>
      <div className="m-auto">
        <div>
          <Play
            icons={{
              paused: <PauseIcon className="w-9 h-9 m-3" />,
              resumed: <PlayIcon className="w-9 h-9 m-3" />,
            }}
          />
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2 className="text-sm font-light">{subtitle}</h2>
        </div>
        <ul className="flex gap-x-2">
          <li>
            <Action.Link title={'Settings'} href={settings(params.id)}>
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
    </>
  )
}

export default Page
