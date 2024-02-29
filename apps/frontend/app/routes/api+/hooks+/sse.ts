import { type LoaderFunctionArgs } from '@remix-run/node'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const context = session.requireValue('context')

  request.headers.set('Authorization', `Bearer ${context.token}`)

  // TODO: This is a hack to get around the fact that the openapi-fetch client doesn't support SSE.

  return fetch(`${process.env.MY_BACKEND_URL}/hooks/sse`, request)
}
