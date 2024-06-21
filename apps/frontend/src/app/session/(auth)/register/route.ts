'use server'

import { NextRequest, NextResponse } from 'next/server'

import { register } from '@/tools/auth'

const REDIRECT_URL = '/session/code'

export const GET = async (req: NextRequest) => {
  await register()

  return NextResponse.redirect(new URL(REDIRECT_URL, req.url))
}
