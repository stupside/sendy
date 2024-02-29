import { createContext } from 'react'

import { type IResult } from 'ua-parser-js'

type IUserAgentContext = IResult | undefined

const UserAgentContext = createContext<IUserAgentContext>(undefined)

export default UserAgentContext
