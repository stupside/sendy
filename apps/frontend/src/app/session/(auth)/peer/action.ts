'use server'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { peer } from '@/tools/auth'

export const handle = async (form: FormData) => {
  'use server'

  const schema = Type.Record(
    Type.String({
      pattern: 'digits\\[\\d+\\]',
    }),
    Type.String({
      minLength: 1,
      maxLength: 1,
    }),
  )

  const data = Value.Decode(schema, Object.fromEntries(form))

  const code = Object.values(data).reduce((acc, digit) => acc + digit)

  await peer(code)
}
