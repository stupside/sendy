'use server'

import { cookies, headers } from 'next/headers'

import { sendy } from './api'

const COOKIES_SESSION_TOKEN_KEY = 'SESSION_TOKEN'

const save = async (token: string) => {
  const cks = await cookies()

  cks.set(COOKIES_SESSION_TOKEN_KEY, token, {
    path: '/',
    sameSite: 'strict',
    secure: false,
    httpOnly: true,
  })
}

export const authentified = async () => {
  const cks = await cookies()

  return cks.has(COOKIES_SESSION_TOKEN_KEY)
}

export const register = async () => {
  const hdrs = await headers()

  const ip =
    hdrs.get('x-real-ip') ??
    hdrs.get('x-forwarded-for') ??
    hdrs.get('remote-addr')

  const agent = hdrs.get('user-agent')

  const ipv4 = ip?.replace('::ffff:', '')

  const { data } = await sendy((c) =>
    c.POST('/auth/register', {
      body: {
        ip: ipv4 ?? '0.0.0.0',
        agent: agent ?? 'unknown',
      },
      cache: 'no-cache',
    }),
  )

  if (!data) {
    throw new Error('Failed to register')
  }

  save(data.token)

  return data.token
}

export const peer = async (code: string) => {
  const { data } = await sendy((c) =>
    c.POST('/auth/peer', {
      body: { code, device: {} },
      cache: 'no-cache',
    }),
  )

  if (!data) {
    throw new Error('Failed to peer')
  }

  save(data.token)
}

export const getToken = async () => {
  const cks = await cookies()

  return cks.get(COOKIES_SESSION_TOKEN_KEY)?.value
}
