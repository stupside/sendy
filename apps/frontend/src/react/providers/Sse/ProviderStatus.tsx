'use client'

import { type FC } from 'react'

import { useSseStatus } from '@/react/hooks'

const ProviderStatus: FC = () => {
  const connected = useSseStatus()

  return (
    <div className="flex m-2 gap-3 items-center">
      <span className="font-black text-md">
        {connected ? 'Online' : 'Offline'}
      </span>
      {connected ? (
        <span className="w-3 h-3 bg-green-600 rounded-full"></span>
      ) : (
        <span className="w-3 h-3 bg-red-600 rounded-full"></span>
      )}
    </div>
  )
}

export default ProviderStatus
