'use server'

import { getToken } from '../auth'
import createClient from 'openapi-fetch'

import type { paths } from '@/api'

const CreateClient = createClient<paths>

type Client = ReturnType<typeof CreateClient>

const makeReq = async <T>(action: (_: Client) => T) => {
  const token = await getToken()

  return action(
    CreateClient({
      baseUrl: process.env.BACKEND_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }),
  )
}

export { makeReq as sendy }
