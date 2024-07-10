'use server'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { sendy } from '@/tools/api'
import { tmdb } from '@/tools/api/tmdb'

export const search = async (form: FormData) => {
  'use server'

  const schema = Type.Object({
    name: Type.String(),
  })

  const { name } = Value.Decode(schema, Object.fromEntries(form))

  const { data } = await tmdb((c) =>
    c.GET('/3/search/multi', {
      params: {
        query: {
          query: name,
          include_adult: true,
        },
      },
    }),
  )

  console.log(data)

  return data
}

export const handle = async (form: FormData) => {
  'use server'

  const schema = Type.Any()

  const { value, type, handler, metadata } = Value.Decode(
    schema,
    Object.fromEntries(form),
  )

  const { data } = await sendy((c) =>
    c.POST('/medias/cast', {
      body: {
        type,
        value,
        handler,
        metadata,
      },
    }),
  )

  void data
}
