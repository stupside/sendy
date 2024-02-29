import type { FC } from 'react'

import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import storage from '~/server/storage/session.server'
import { apiClient } from '~/server/api'
import { useFetcher, useLoaderData } from '@remix-run/react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const csrf = session.csrf.generate()

  return json(
    {
      csrf,
    },
    {
      headers: {
        'Set-Cookie': await storage.commitSession(session.state),
      },
    },
  )
}

const ActionBody = Type.Object({
  csrf: Type.String(),
  type: Type.String(),
  value: Type.String(),
  subtype: Type.String(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await storage.extractSession(request)

  const form = await request.formData()

  const body = Value.Decode(ActionBody, Object.fromEntries(form.entries()))

  if (session.csrf.validate(body.csrf)) {
    throw new Error('Invalid CSRF token.')
  }

  const context = session.requireValue('context')

  const { response } = await apiClient(request).POST('/contents/cast', {
    body: {
      type: body.type,
      value: body.value,
      subtype: body.subtype,
    },
    headers: {
      Authorization: `Bearer ${context.token}`,
    },
  })

  return response
}

const PageComponent: FC = () => {
  const data = useLoaderData<typeof loader>()

  const fetcher = useFetcher<typeof action>()

  return (
    <fetcher.Form action="POST">
      <input type="hidden" name="csrf" value={data.csrf} />

      <input type="text" name="type" placeholder="Type" />
      <input type="text" name="subtype" placeholder="Subtype" />

      <input type="text" name="value" placeholder="Value" />

      <button type="submit">Cast</button>
    </fetcher.Form>
  )
}

export default PageComponent
