'use server'

import createClient from 'openapi-fetch'

import { getToken } from '../auth'

import type { paths } from '@/api'

const CreateClient = createClient<paths>

type Client = ReturnType<typeof CreateClient>

const MakeReq = async <T>(action: (_: Client) => T) => {
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

export { MakeReq as sendy }
