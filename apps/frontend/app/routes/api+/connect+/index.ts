import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { apiClient } from '~/server/api'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data, response } = await apiClient(request).POST('/sessions', {
    body: {
      ip: '0.0.0.0',
      agent: 'unknown',
    },
  })

  if (data === undefined) return response

  const session = await storage.extractSession(request)

  session.state.set('context', data)

  const cookie = await storage.commitSession(session.state)

  return redirect('/app/displayer/code', {
    headers: {
      'Set-Cookie': cookie,
    },
  })
}
