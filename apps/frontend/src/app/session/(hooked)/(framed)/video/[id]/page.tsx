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
    if (data.metadata.ttid) {
      return <TmdbDetails id={props.params.id} ttid={data.metadata.ttid} />
    } else {
      return <>Media with no ttid is not yet supported</>
    }
  }

  return null
}

export default Page
