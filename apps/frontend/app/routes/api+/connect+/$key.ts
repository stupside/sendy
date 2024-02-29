import { type LoaderFunctionArgs, redirect } from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { apiClient } from '~/server/api'

import storage from '~/server/storage/session.server'

const Loader = Type.Object({
  key: Type.String(),
})

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { key } = Value.Decode(Loader, params)

  const { data, response } = await apiClient(request).POST(
    '/sessions/connect',
    {
      body: {
        key,
        device: {
          ip: undefined,
          agent: request.headers.get('user-agent') ?? undefined,
        },
      },
    },
  )

  if (data === undefined) return response

  const session = await storage.extractSession(request)

  session.state.set('context', data)

  const cookie = await storage.commitSession(session.state)

  return redirect('/app/caster/setup', {
    headers: {
      'Set-Cookie': cookie,
    },
  })
}
