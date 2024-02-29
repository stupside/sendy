'use server'

import { sendy } from '@/tools/api'

export const code = async () => {
  'use server'

  const { data } = await sendy((c) =>
    c.POST('/sessions/code', {
      cache: 'no-cache',
      body: {
        callback: `${process.env.FRONTEND_URL}/session/peer?data=`,
      },
    }),
  )

  return data
}
