'use server'

import Link from 'next/link'

import { NextPage } from 'next'

const audios = (id: number) => {
  return `/session/video/${id}/play/overlay/menu/audios`
}

const qualities = (id: number) => {
  return `/session/video/${id}/play/overlay/menu/qualities`
}

const subtitles = (id: number) => {
  return `/session/video/${id}/play/overlay/menu/subtitles`
}

const Page: NextPage<{ params: { id: number } }> = (props) => {
  return (
    <ul className="flex flex-col gap-y-3 text-right">
      <li>
        <Link href={audios(props.params.id)}>Audios</Link>
      </li>
      <li>
        <Link href={qualities(props.params.id)}>Qualities</Link>
      </li>
      <li>
        <Link href={subtitles(props.params.id)}>Subtitles</Link>
      </li>
    </ul>
  )
}

export default Page
