import createClient from 'openapi-fetch'

import type { paths } from 'types/api'

export const apiClient = ({
  signal,
  headers,
}: Pick<Request, 'signal' | 'headers'>) => {
  return createClient<paths>({
    signal,
    headers,
    baseUrl: process.env.MY_BACKEND_URL,
  })
}
