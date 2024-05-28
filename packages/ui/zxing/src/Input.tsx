'use client'

import { type FC, useCallback, useEffect, useRef } from 'react'

import {
  BrowserCodeReader,
  BrowserQRCodeReader,
  type IScannerControls,
} from '@zxing/browser'

const Input: FC<{
  scan?: boolean
  onScan: (raw: string) => Promise<boolean>
}> = ({ scan = false, onScan }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const controls = useRef<IScannerControls>()

  const start = useCallback(async () => {
    if (ref.current === null) return

    const reader = new BrowserQRCodeReader()

    const devices = await BrowserCodeReader.listVideoInputDevices()

    const device = devices.at(0)

    if (device) {
      controls.current = await reader.decodeFromVideoDevice(
        device.deviceId,
        ref.current,
        async (result, error, control) => {
          if (error) return

          const raw = result?.getText()

          if (raw) {
            const stop = await onScan(raw)

            if (stop) control.stop()
          } else {
            control.stop()
          }
        },
      )
    }
  }, [ref.current])

  const stop = useCallback(() => {
    if (ref.current) {
      controls.current?.stop()
    }
  }, [ref.current])

  useEffect(() => {
    if (scan) {
      start()
    }

    return () => {
      stop()
    }
  }, [scan, start, stop])

  return <video ref={ref} className="flex-grow bg-zinc-800" />
}

export default Input
