'use client'

import {
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

import { useRouter } from 'next/router'

import { useSelectedLayoutSegment } from 'next/navigation'

import Header from './Header'
import Footer from './Footer'

const Overlay: FC<
  PropsWithChildren<{
    actions: Array<FC>
  }>
> = (props) => {
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const segment = useSelectedLayoutSegment()

  const [lastMove, setLastMove] = useState(0)

  useEffect(() => {
    const onTimout = () => {
      router.back()
    }

    const timeout = setTimeout(onTimout, segment ? 25_000 : 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [router.back, lastMove, segment])

  useEffect(() => {
    const onMouseMove = (e: HTMLElementEventMap['mousemove']) => {
      setLastMove(e.timeStamp)
    }

    ref.current?.addEventListener('mousemove', onMouseMove)

    return () => {
      ref.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [ref.current])

  return (
    <>
      {props.children}
      <div
        ref={ref}
        className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/45 to-black/90"
      >
        <Header />
        <ul className="mt-auto mb-3">
          {props.actions.map((Action, idx) => (
            <li key={idx}>
              <Action />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  )
}

export default Overlay
