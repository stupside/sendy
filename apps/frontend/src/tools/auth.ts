'use server'

import { cookies } from 'next/headers'

import { sendy } from './api'

const COOKIES_SESSION_TOKEN_KEY = 'SESSION_TOKEN'

const save = (token: string) => {
  cookies().set(COOKIES_SESSION_TOKEN_KEY, token, {
    path: '/',
    sameSite: 'strict',
    secure: false,
    httpOnly: true,
  })
}

export const authentified = async () => {
  return cookies().has(COOKIES_SESSION_TOKEN_KEY)
}

export const register = async () => {
  const { data } = await sendy((c) =>
    c.POST('/auth/register', {
      body: {},
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
  return cookies().get(COOKIES_SESSION_TOKEN_KEY)?.value
}
