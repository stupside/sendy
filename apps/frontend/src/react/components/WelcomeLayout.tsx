'use server'

import { FC, PropsWithChildren } from 'react'

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-3 my-auto m-auto md:ml-48">
      <h1 className="mb-12 text-3xl font-black">
        Empower your <br />
        <span className="text-green-400">streaming</span> experience
      </h1>
      {children}
    </div>
  )
}

export default WelcomeLayout
