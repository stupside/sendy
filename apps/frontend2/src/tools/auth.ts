'use server'

import { cookies } from 'next/headers'

import { MakeReq } from './api'

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
  const { data } = await MakeReq((c) =>
    c.POST('/auth/register', {
      body: {},
      cache: 'no-cache',
    }),
  )

  if (data === undefined) {
    throw new Error('Failed to register')
  }

  save(data.token)

  return data.token
}

export const peer = async (key: string) => {
  const { data } = await MakeReq((c) =>
    c.POST('/auth/peer', {
      body: { key },
      cache: 'no-cache',
    }),
  )

  if (data === undefined) {
    throw new Error('Failed to peer')
  }

  save(data.token)
}

export const getToken = async () => {
  return cookies().get(COOKIES_SESSION_TOKEN_KEY)?.value
}
