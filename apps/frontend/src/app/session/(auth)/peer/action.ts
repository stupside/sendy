'use server'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { peer } from '@/tools/auth'

export const handlePeer = async (form: FormData) => {
  'use server'

  const PeerForm = Type.Object({
    digits: Type.Array(Type.String({ maxLength: 1, minLength: 1 })),
  })

  const data = Value.Cast(PeerForm, Object.fromEntries(form))

  await peer(data.digits.reduce((acc, digit) => acc + digit))
}
