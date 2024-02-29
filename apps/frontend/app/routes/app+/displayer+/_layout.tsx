import { type FC } from 'react'

import { Outlet } from '@remix-run/react'

import Sse from '~/client/components/features/Sse'

const ENDPOINT = '/api/hooks/sse'

const PageComponent: FC = () => {
  return (
    <Sse loader={ENDPOINT}>
      <Outlet />
    </Sse>
  )
}

export default PageComponent
