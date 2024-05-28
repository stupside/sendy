'use server'

import { NextPage } from 'next'

import { MakeReq } from '@/tools/api'

const Page: NextPage = async () => {
  const { data } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: 1,
        },
      },
    }),
  )

  if (data === undefined) {
    return <div>Failed to fetch data</div>
  }

  return (
    <div>
      <h1>Cast</h1>
      <p>{data.type}</p>
      <p>{data.value}</p>
    </div>
  )
}

export default Page
