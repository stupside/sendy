import { useNavigate } from '@remix-run/react'
import type { FC } from 'react'

import useSse from '~/client/hooks/useSse'

const Page: FC = () => {
  const navigate = useNavigate()

  useSse({
    connector: {
      event: '/content/cast',
      handler: async (castable) => {
        if (castable === undefined) throw new Error()

        navigate(`/app/displayer/cast/${castable.id}/${castable.type}`, {
          replace: true,
        })
      },
    },
  })

  return (
    <div className="m-auto">
      <h1 className="text-3xl font-medium animate-pulse">
        Waiting for content...
      </h1>
    </div>
  )
}

export default Page
