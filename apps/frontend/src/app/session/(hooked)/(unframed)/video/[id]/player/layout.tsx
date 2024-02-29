'use server'

import { NextPage } from 'next'

import { PropsWithChildren } from 'react'

import Controller from './_private/Controller'
import Video from './_private/Video'

import { sendy } from '@/tools/api'

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{ id: number }>
  }>
> = async (props) => {
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

  if (!data) return null

  return (
    <Video url={data.value} title="unknown" subtitle="unknown">
      <Controller>{props.children}</Controller>
    </Video>
  )
}

export default Layout
