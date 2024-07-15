import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import { sendy } from '@/tools/api'

import { QualityProvider } from '@sendy/react-media-video-hls'

const Layout: NextPage<PropsWithChildren<{ params: { id: number } }>> = async (
  props,
) => {
  const { data } = await sendy((c) =>
    c.GET('/medias/{id}', {
      params: {
        path: {
          id: props.params.id,
        },
      },
    }),
  )

  return <QualityProvider>{props.children}</QualityProvider>
}

export default Layout
