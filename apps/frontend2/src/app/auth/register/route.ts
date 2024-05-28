'use server'

import { NextApiHandler } from 'next'

import { NextResponse } from 'next/server'

import { register } from '@/tools/auth'

const REDIRECT_URL = '/session/code'

export const GET: NextApiHandler = async (req) => {
  await register()

  return NextResponse.redirect(new URL(REDIRECT_URL, req.url))
}
