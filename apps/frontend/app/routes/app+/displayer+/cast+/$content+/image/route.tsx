import { type FC } from 'react'

import { useLoaderData } from '@remix-run/react'

import { type LoaderFunctionArgs, json } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import storage from '~/server/storage/session.server'

import { apiClient } from '~/server/api'

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

  return json(data)
}

const PageComponent: FC = () => {
  const { value } = useLoaderData<typeof loader>()

  return (
    <article className="m-auto">
      <img title={value} src={value} />
    </article>
  )
}

export default PageComponent
