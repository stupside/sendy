import { type FC, type PropsWithChildren } from 'react'

const Header: FC<PropsWithChildren> = ({ children }) => {
  return <header className="fixed top-0 left-0 w-full p-4">{children}</header>
}

export default Header
