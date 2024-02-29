'use client'

import { NextPage } from 'next'
import Link from 'next/link'

import { register } from '@/tools/auth'

const Page: NextPage = () => {
  return (
    <Link
      href={'/me'}
      onClick={register}
      className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      Register
    </Link>
  )
}

export default Page
