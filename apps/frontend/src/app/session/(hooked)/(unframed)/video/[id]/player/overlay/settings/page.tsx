'use server'

import { NextPage } from 'next'
import Link from 'next/link'

import { _translator } from '@/i18n/translator'

const languages = (id: number) =>
  `/session/video/${id}/player/overlay/settings/languages`

const qualitites = (id: number) =>
  `/session/video/${id}/player/overlay/settings/qualities`

const Page: NextPage<{ params: Promise<{ id: number }> }> = async (props) => {
  const params = await props.params

  const _t = await _translator('en')

  return (
    <ul className="flex flex-col gap-y-3">
      <li>
        <Link
          href={languages(params.id)}
          className="block px-3 py-2 bg-zinc-700"
        >
          {await _t(
            (m) =>
              m.app.session.hooked.unframed.video.player.overlay.settings
                .languages,
          )}
        </Link>
      </li>
      <li>
        <Link
          href={qualitites(params.id)}
          className="block px-3 py-2 bg-zinc-700"
        >
          {await _t(
            (m) =>
              m.app.session.hooked.unframed.video.player.overlay.settings
                .qualities,
          )}
        </Link>
      </li>
    </ul>
  )
}

export default Page
