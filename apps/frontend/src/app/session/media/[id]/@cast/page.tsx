'use server'

import { NextPage } from 'next'

import { Video } from '@sendy/ui-content-video'

import { MakeReq } from '@/tools/api'

import { getController } from './_private'

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
    // return <div>Failed to fetch data</div>
  }

  const Controller = getController('m3u8')

  return (
    // <Video url={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}>
    //   <Controller />
    // </Video>
    <div>player</div>
  )
}

export default Page
