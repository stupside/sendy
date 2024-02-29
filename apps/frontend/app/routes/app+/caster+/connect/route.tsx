import { type FC, useState } from 'react'

import { Digits } from '@sendy/ui-interactible'
import { FocusableBoundary } from '@sendy/ui-navigation'

import { Header } from '~/client/components/layout'

import Logo from '~/client/components/commons/Logo'
import Navigation from '~/client/components/commons/Navigation'

const PageComponent: FC = () => {
  const [key, setKey] = useState<{
    ok: boolean
    digits: string
  }>()

  const placeholder = '0000'

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
            <Navigation title="Connect" to={`/api/connect/${key?.digits}`} />
          </section>
        )}
      </FocusableBoundary>
    </>
  )
}

export default PageComponent
