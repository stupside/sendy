import { FC } from 'react'

import { ProviderStatus } from '@/react/providers/Sse'

const Header: FC = () => {
  return (
    <header>
      <ProviderStatus />
    </header>
  )
}

export default Header
