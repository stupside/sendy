import { Outlet } from '@remix-run/react'

import { Footer, Header } from '~/client/components/layout'

const PageComponent = () => {
  return (
    <>
      <Header />
      <div className="grow-1">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default PageComponent
