'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import { sendy } from '@/tools/api'

import Video from './_private/Video'
import Controller from './_private/Controller'

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

  if (!data) return null

  return (
    <Video url={data.value} title="unknown" subtitle="unknown">
      <Controller>{props.children}</Controller>
    </Video>
  )
}

export default Layout
