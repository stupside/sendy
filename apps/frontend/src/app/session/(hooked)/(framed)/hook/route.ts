import http from 'node:http'

import { NextRequest, NextResponse } from 'next/server'

import { getToken } from '@/tools/auth'

export const dynamic = 'force-dynamic'

const endpoint = `${process.env.BACKEND_URL}/hooks/sse`

export const GET = async (req: NextRequest) => {
  const token = await getToken()

  const stream = new ReadableStream({
    start: (controller) => {
      const request = http.get(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (res) => {
          res.on('end', () => {
            controller.close()
          })

          res.on('error', (err) => {
            controller.error(err)
          })

          res.on('data', (chunk) => {
            controller.enqueue(chunk)
          })
        },
      )

      request.on('error', (err) => {
        controller.error(err)
      })

      req.signal.addEventListener('abort', () => {
        request.destroy()
      })
    },
  })

  const response = new NextResponse(stream)

  response.headers.set('Connection', 'keep-alive')
  response.headers.set('Cache-Control', 'no-cache')
  response.headers.set('Content-Type', 'text/event-stream')

  return response
}
