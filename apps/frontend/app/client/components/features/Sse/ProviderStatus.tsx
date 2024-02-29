import { type FC } from 'react'

import useSse from '~/client/hooks/useSse'

const ProviderStatus: FC = () => {
  const { connected } = useSse({})

  return (
    <div className="flex m-2 gap-5 items-center">
      {connected ? (
        <>
          <Online />
          <span className="font-bold text-lg">Connected</span>
        </>
      ) : (
        <>
          <Offline />
          <span className="font-bold text-lg">Disconnected</span>
        </>
      )}
    </div>
  )
}

const Online = () => <span className="w-4 h-4 bg-green-600 rounded-full"></span>

const Offline = () => <span className="w-4 h-4 bg-red-600 rounded-full"></span>

export default ProviderStatus
