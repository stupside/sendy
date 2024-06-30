'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { getMockedContents } from '@/tools/mock'

import Medias from './_private/Medias'

const Page: NextPage<PropsWithChildren> = async (props) => {
  // const { data } = await MakeReq((c) => c.GET('/contents/history'))

  // if (data === undefined) return null

  // if (data.length > 0) return null

  const medias = await getMockedContents()

  return (
    <div className="flex flex-col flex-grow overflow-x-hidden p-8">
      {props.children}
      <footer>
        <header className="mb-2">
          <h1 className="font-black text-xl">History</h1>
        </header>
        <Medias
          list={medias.map((m, idx) => ({
            id: idx,
            title: m.title,
            duration: m.duration,
            poster: m.image.poster,
          }))}
        />
      </footer>
    </div>
  )
}

export default Page
