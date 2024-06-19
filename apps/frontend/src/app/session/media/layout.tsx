'use server'

import { NextPage } from 'next'

import { PropsWithChildren, ReactNode } from 'react'

import { MakeReq } from '@/tools/api'
import { getMockedContents } from '@/tools/mock'

import { ProviderStatus } from '@/react/providers/Sse'

import Medias from './_private/Medias'

const Page: NextPage<
  PropsWithChildren<{ list: ReactNode; history: ReactNode }>
> = async (props) => {
  const { data } = await MakeReq((c) => c.GET('/contents/history'))

  // if (data === undefined) return null

  // if (data.length > 0) return null

  const medias = await getMockedContents()

  return (
    <>
      <header className="sticky flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-3xl">Sendy</h1>
        <ProviderStatus />
      </header>
      <div className="flex flex-col flex-grow overflow-x-hidden mx-10 mb-10">
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
    </>
  )
}

export default Page
