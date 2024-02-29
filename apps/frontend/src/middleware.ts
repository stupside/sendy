'use server'

import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server'

import { authentified } from '@/tools/auth'

export const dynamic = 'force-dynamic'

const middleware: NextMiddleware = async () => {
  if (await authentified()) {
    return NextResponse.next()
  }

  return NextResponse.error()
}

export const config: MiddlewareConfig = {
  matcher: ['/session/((?!peer$|register$).*)'],
}

export default middleware
