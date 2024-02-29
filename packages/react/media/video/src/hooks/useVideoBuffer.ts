import { useEffect, useState } from 'react'

import useVideo from './useVideo'

const BufferingState = [Number(HTMLMediaElement.HAVE_NOTHING)]

// const BufferingNetworkState = [
//   Number(HTMLMediaElement.NETWORK_IDLE),
//   Number(HTMLMediaElement.NETWORK_EMPTY),
//   Number(HTMLMediaElement.NETWORK_LOADING),
//   Number(HTMLMediaElement.NETWORK_NO_SOURCE),
// ]

const useVideoBuffer = () => {
  const { ref } = useVideo()

  const [buffering, setBuffering] = useState(true)

  useEffect(() => {
    const onWaiting = () => {
      setBuffering(true)
    }

    const onPlayling = () => {
      setBuffering(false)
    }

    if (ref.current?.readyState) {
      setBuffering(BufferingState.includes(ref.current.readyState))
    }

    ref.current?.addEventListener('waiting', onWaiting)
    ref.current?.addEventListener('playing', onPlayling)

    return () => {
      ref.current?.removeEventListener('waiting', onWaiting)
      ref.current?.removeEventListener('playing', onPlayling)
    }
  }, [ref])

  return { buffering }
}

export default useVideoBuffer
