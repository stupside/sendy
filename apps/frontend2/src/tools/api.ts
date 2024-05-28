'use server'

import createClient from 'openapi-fetch'

import { getToken } from './auth'

import type { paths } from '@/api'

const CreateClient = createClient<paths>

type Client = ReturnType<typeof CreateClient>

export const MakeReq = async <T>(action: (_: Client) => T) => {
  const token = await getToken()

  const client = CreateClient({
    baseUrl: process.env.MY_BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

  return action(client)
}
