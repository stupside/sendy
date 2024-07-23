'use server'

import { NextPage } from 'next'

import { sendy } from '@/tools/api'

import Video from './_private/VideoDetails/Video'

const Page: NextPage<{
  params: { id: number }
}> = async (props) => {
  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data?.type === 'video') {
    return <Video id={props.params.id} tmdbid={data.metadata.tmdbid} />
  }

  return null
}

export default Page
