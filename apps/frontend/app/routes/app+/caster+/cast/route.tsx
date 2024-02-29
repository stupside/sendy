import { type LoaderFunctionArgs } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import storage from '~/server/storage/session.server'
import { apiClient } from '~/server/api'

const Loader = Type.Object({
  type: Type.String(),
  value: Type.String(),
  subtype: Type.String(),
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const context = session.requireValue('context')

  const url = new URL(request.url)

  const content = Object.fromEntries(url.searchParams)

  const { value, type, subtype } = Value.Decode(Loader, content)

  const { response } = await apiClient(request).POST('/contents/cast', {
    body: {
      type,
      value,
      subtype,
    },
    headers: {
      Authorization: `Bearer ${context.token}`,
    },
  })

  return response
}
