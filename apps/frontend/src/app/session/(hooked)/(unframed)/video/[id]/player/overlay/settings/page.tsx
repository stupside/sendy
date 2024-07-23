'use server'

import Link from 'next/link'

import { NextPage } from 'next'

const languages = (id: number) =>
  `/session/video/${id}/player/overlay/settings/languages`

const qualitites = (id: number) =>
  `/session/video/${id}/player/overlay/settings/qualities`

const Page: NextPage<{ params: { id: number } }> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Settings</h1>
      <ul className="flex flex-col gap-y-3">
        <li>
          <Link
            href={languages(props.params.id)}
            className="block px-3 py-2 bg-zinc-700"
          >
            Languages
          </Link>
        </li>
        <li>
          <Link
            href={qualitites(props.params.id)}
            className="block px-3 py-2 bg-zinc-700"
          >
            Qualitites
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Page
