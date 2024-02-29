import { createCookieSessionStorage, type Session } from '@remix-run/node'

import { type MySessionData } from './types/MySessionData'
import { type MySessionFlashData } from './types/MySessionFlashData'

const storage = createCookieSessionStorage<MySessionData, MySessionFlashData>({
  cookie: {
    name: '__fastack',
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secrets: [process.env.MY_STORAGE_SECRET],
  },
})

export type MySession = Session<MySessionData, MySessionFlashData>

const extractSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie')

  const session = await storage.getSession(cookie)

  const requireValue = <TKey extends keyof MySessionData>(key: TKey) => {
    const value = session.get(key)

    if (value === undefined) {
      session.flash('error', `Could not resolve ${key} value from session.`)

      throw new Error(`Could not resolve ${key}`)
    }

    return value
  }

  const hasValue = <TKey extends keyof MySessionData>(key: TKey): boolean => {
    return session.has(key)
  }

  return {
    hasValue,
    requireValue,
    state: session,
  }
}

const session = Object.assign(storage, {
  extractSession,
})

export { session }
export default session
