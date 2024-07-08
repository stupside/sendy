'use server'

import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server'

import { authentified } from '@/tools/auth'

export const dynamic = 'force-dynamic'

const middleware: NextMiddleware = async () => {
  if ((await authentified()) == false) {
    return NextResponse.error()
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ['/session/((?!peer$|register$).*)'],
}

export default middleware
