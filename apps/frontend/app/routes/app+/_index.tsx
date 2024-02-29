import { type FC } from 'react'

import { FocusableBoundary } from '@sendy/ui-navigation'

import Logo from '~/client/components/commons/Logo'

import { Header } from '~/client/components/layout'

import Navigation from '~/client/components/commons/Navigation'

const PageComponent: FC = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <section className="m-auto">
        <h1 className="text-3xl font-bold text-center text-zinc-200 mb-6">
          What would you like to do?
        </h1>
        <FocusableBoundary focus lock>
          {({ ref }) => (
            <div ref={ref} className="flex flex-col gap-y-3">
              <Navigation title="Cast" to="/app/caster/connect" />
              <Navigation title="Display" to="/api/connect" />
            </div>
          )}
        </FocusableBoundary>
      </section>
    </>
  )
}

export default PageComponent
