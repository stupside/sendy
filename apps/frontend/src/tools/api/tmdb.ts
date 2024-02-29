'use server'

import createClient from 'openapi-fetch'

import type { paths } from '@/api/tmdb'

const CreateClient = createClient<paths>

type Client = ReturnType<typeof CreateClient>

const MakeReq = async <T>(action: (_: Client) => T) => {
  return action(
    CreateClient({
      baseUrl: process.env.TMDB_URL,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    }),
  )
}

export { MakeReq as tmdb }
