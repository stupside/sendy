import { useContext } from 'react'

import UserAgentContext from '~/client/components/features/UserAgent'

const useUserAgent = () => useContext(UserAgentContext)

export default useUserAgent
