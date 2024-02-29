'use server'

import { NextPage } from 'next'
import Link from 'next/link'

const languages = (id: number) =>
  `/session/video/${id}/player/overlay/settings/languages`

const qualitites = (id: number) =>
  `/session/video/${id}/player/overlay/settings/qualities`

const Page: NextPage<{ params: Promise<{ id: number }> }> = async (props) => {
  const params = await props.params

  return (
    <ul className="flex flex-col gap-y-3">
      <li>
        <Link
          href={languages(params.id)}
          className="block px-3 py-2 bg-zinc-700"
        >
          Languages
        </Link>
      </li>
      <li>
        <Link
          href={qualitites(params.id)}
          className="block px-3 py-2 bg-zinc-700"
        >
          Qualitites
        </Link>
      </li>
    </ul>
  )
}

export default Page
