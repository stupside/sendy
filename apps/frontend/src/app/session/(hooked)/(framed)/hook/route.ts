import { NextResponse } from 'next/server'

import { sendy } from '@/tools/api'

export const GET = async () => {
  const { response } = await sendy((c) => c.GET('/hooks/sse'))

  if (response.body === null) {
    return NextResponse.error()
  }

  const { readable, writable } = new TransformStream()

  response.body.pipeTo(writable)

  const headers = new Headers(response.headers)

  headers.set('Content-Encoding', 'none')

  return new NextResponse(readable, {
    headers: headers,
    status: response.status,
    statusText: response.statusText,
  })
}
