'use server'

import { NextPage } from 'next'

import Video from './_private/VideoDetails/Video'

import { sendy } from '@/tools/api'

const Page: NextPage<{
  params: Promise<{ id: number }>
}> = async (props) => {
  const params = await props.params

  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: params.id,
        },
      },
    }),
  )

  if (data?.type === 'video') {
    return <Video id={params.id} tmdbid={data.metadata.tmdbid} />
  }

  return null
}

export default Page
