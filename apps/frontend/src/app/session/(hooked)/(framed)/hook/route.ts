import { MakeReq } from '@/tools/api'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const { response } = await MakeReq((c) => c.GET('/hooks/sse'))

  if (response.body === null) {
    return NextResponse.error()
  }

  const { readable, writable } = new TransformStream()

  response.body.pipeTo(writable).catch((error) => {
    console.error('Stream piping error:', error)
  })

  const headers = new Headers(response.headers)

  headers.set('Content-Encoding', 'none')

  return new NextResponse(readable, {
    headers: headers,
    status: response.status,
    statusText: response.statusText,
  })
}
