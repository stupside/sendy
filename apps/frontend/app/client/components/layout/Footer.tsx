import { type FC, type PropsWithChildren } from 'react'

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-4">{children}</footer>
  )
}

export default Footer
