'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { sendy } from '@/tools/api'

import Video from './_private/Video'

const Layout: NextPage<
  PropsWithChildren<{
    params: { id: number }
  }>
> = async (props) => {
  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  if (data === undefined) return null

  return (
    <Video url={data.value} subtype={'m3u8'}>
      {props.children}
    </Video>
  )
}

export default Layout
