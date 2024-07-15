'use server'

import { NextPage } from 'next'

import { sendy } from '@/tools/api'

import TmdbDetails from './_private/TmdbDetails'

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
    if (data.metadata.tmdbid) {
      return <TmdbDetails id={props.params.id} tmdbid={data.metadata.tmdbid} />
    } else {
      return <>Media with no tmdbid is not yet supported</>
    }
  }

  return null
}

export default Page
