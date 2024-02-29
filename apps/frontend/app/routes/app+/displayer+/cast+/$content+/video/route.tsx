import { type FC } from 'react'

import { json, useLoaderData } from '@remix-run/react'

import type { LoaderFunctionArgs } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import UAParser, { type IResult } from 'ua-parser-js'

import { Video } from '@sendy/ui-content-video'

import { apiClient } from '~/server/api'
import storage from '~/server/storage/session.server'

import UserAgentContext from '~/client/components/features/UserAgent'

import { getController } from './components'

const Loader = Type.Object({
  content: Type.String(),
})

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const context = session.requireValue('context')

  const { content } = Value.Decode(Loader, params)

  const { data } = await apiClient(request).GET('/contents/{id}', {
    params: {
      path: {
        id: +content,
      },
    },
    headers: {
      Authorization: `Bearer ${context.token}`,
    },
  })

  const agent = new UAParser(
    request.headers.get('User-Agent') ?? 'Unknown',
  ).getResult()

  return json({
    agent,
    content: data,
  })
}

const PageComponent: FC = () => {
  const { content, agent } = useLoaderData<typeof loader>()

  if (content === undefined) return null

  const Controller = getController(content.type)

  return (
    <UserAgentContext.Provider value={agent as IResult}>
      <Video url={content.value}>
        <Controller />
      </Video>
    </UserAgentContext.Provider>
  )
}

export default PageComponent
