'use server'

import { NextPage } from 'next'

import { Video } from '@sendy/ui-content-video'

import { MakeReq } from '@/tools/api'

import { getController } from './_components'

const Page: NextPage<{ params: { id: number } }> = async ({ params }) => {
  const { data } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: params.id,
        },
      },
    }),
  )

  if (data === undefined) {
    return <div>Failed to fetch data</div>
  }

  const Controller = getController(data.type)

  return (
    <Video url={data.value}>
      <Controller />
    </Video>
  )
}

export default Page
