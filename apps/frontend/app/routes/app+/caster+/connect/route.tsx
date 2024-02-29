import { useFetcher, useLoaderData } from '@remix-run/react'
import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'

import { type FC, useState } from 'react'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { Digits } from '@sendy/ui-interactible'
import { FocusableBoundary } from '@sendy/ui-navigation'

import { apiClient } from '~/server/api'
import storage from '~/server/storage/session.server'

import { Header } from '~/client/components/layout'

import Logo from '~/client/components/commons/Logo'

const ZERO_CHAR = '0'
const EMPTY_STRING = ''

const ActionBody = Type.Object({
  code: Type.String(),
  csrf: Type.String(),
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  const csrf = session.csrf.generate()

  const { data: config } = await apiClient(request).GET('/server/config')

  if (config === undefined) {
    throw new Error('Config not found.')
  }

  return json(
    {
      csrf,
      config,
    },
    {
      headers: {
        'Set-Cookie': await storage.commitSession(session.state),
      },
    },
  )
}

export const action = async ({ request }: LoaderFunctionArgs) => {
  const form = await request.formData()

  const body = Value.Decode(ActionBody, Object.fromEntries(form))

  const session = await storage.extractSession(request)

  if (session.csrf.validate(body.csrf)) {
    throw new Error('Invalid CSRF token.')
  }

  return redirect(`/api/connect/${body.code}`)
}

const PageComponent: FC = () => {
  const [key, setKey] = useState<{
    ok: boolean
    digits: string
  }>()

  const fetcher = useFetcher<typeof action>()
  const data = useLoaderData<typeof loader>()

  const acc = (acc: string) => acc + ZERO_CHAR

  const placeholder = Array.from({ length: data.config.code.len }).reduce(
    acc,
    EMPTY_STRING,
  )

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <FocusableBoundary focus lock>
        {({ ref }) => (
          <section
            ref={ref}
            className="flex flex-col justify-center gap-y-5 mx-auto"
          >
            <Digits
              placeholder={placeholder}
              onChange={(digits, ok) => {
                setKey({
                  ok,
                  digits: digits.reduce((acc, digit) => acc + digit, ''),
                })
              }}
            />
            <fetcher.Form action="POST">
              <input type="hidden" name="csrf" value={data.csrf} />
              <input type="hidden" name="code" value={key?.digits} />
              <button disabled={!key?.ok} type="submit">
                Connect
              </button>
            </fetcher.Form>
          </section>
        )}
      </FocusableBoundary>
    </>
  )
}

export default PageComponent
