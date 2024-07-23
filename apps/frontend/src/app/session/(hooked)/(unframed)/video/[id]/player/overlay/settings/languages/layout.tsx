'use server'

import { NextPage } from 'next'

import { ReactNode } from 'react'

const Layout: NextPage<{ audios: ReactNode; subtitles: ReactNode }> = (
  props,
) => {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Languages</h1>
      <div className="flex gap-x-12">
        <div>
          <h2 className="font-semibold text-xl">Audios</h2>
          <div>{props.audios}</div>
        </div>
        <div>
          <h2 className="font-semibold text-xl">Subtitles</h2>
          <div>{props.subtitles}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
