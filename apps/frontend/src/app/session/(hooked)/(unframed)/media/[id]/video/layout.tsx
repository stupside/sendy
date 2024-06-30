'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { MakeReq } from '@/tools/api'
import { getMockedVideo } from '@/tools/mock'

import Video from './_private/Video'

const Layout: NextPage<
  PropsWithChildren<{
    params: { id: number }
  }>
> = async (props) => {
  const { data = await getMockedVideo() } = await MakeReq((c) =>
    c.GET('/contents/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) throw new Error('Could not fetch data')

  return (
    <Video url={data.value} subtype={data.subtype}>
      {props.children}
    </Video>
  )
}

export default Layout
