'use server'

import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

const Page: NextPage<PropsWithChildren> = async ({ children }) => {
  // const { data } = await MakeReq((c) => c.GET('/contents/history'))

  // if (data === undefined) {
  //   return <div>Failed to fetch data</div>
  // }

  const data = Array.from({ length: 10 }).map(() => ({
    value: 'https://test.sendy.dev',
  }))

  return (
    <>
      <header>
        <h1>
          <span className="font-bold text-2xl mr-3">Device</span>
          <span className="font-light">10.10.10.1</span>
        </h1>
      </header>
      <div className="flex flex-grow justify-center items-center m-auto">
        {children}
      </div>
      <footer>
        <header className="mb-3">
          <h1 className="font-bold text-2xl">History</h1>
        </header>
        <article className="flex gap-x-5">
          {data.map((content, idx) => {
            return (
              <section
                key={idx}
                className="flex flex-col gap-y-8 px-5 py-3 rounded-2xl bg-zinc-700"
              >
                <header>
                  <h1>
                    <span className="font-bold text-md mr-5">Source</span>
                    <span className="text-sm font-light">{content.value}</span>
                  </h1>
                </header>
                <div className="m-auto">
                  <PlayCircleIcon className="w-8 h-8" />
                </div>
                <footer>
                  <p className="text-sm font-light text-end">10m 09s ago</p>
                </footer>
              </section>
            )
          })}
        </article>
      </footer>
    </>
  )
}

export default Page
