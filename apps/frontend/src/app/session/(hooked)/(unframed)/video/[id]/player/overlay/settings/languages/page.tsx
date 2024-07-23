'use server'

import { NextPage } from 'next'

import { ReactNode } from 'react'

const Page: NextPage<{ audios: ReactNode; subtitles: ReactNode }> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Languages</h1>
      <div className="flex gap-x-12">
        <div>
          <h2 className="font-bold text-xl">Audios</h2>
          <div>{props.audios}</div>
        </div>
        <div>
          <h2 className="font-bold text-xl">Subtitles</h2>
          <div>{props.subtitles}</div>
        </div>
      </div>
    </div>
  )
}

export default Page
