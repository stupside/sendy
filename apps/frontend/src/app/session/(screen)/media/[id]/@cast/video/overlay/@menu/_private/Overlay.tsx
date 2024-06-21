'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

type VideoFeatures = Partial<{
  audios: FC<PropsWithChildren>
  subtitles: FC<PropsWithChildren>
  qualities: FC<PropsWithChildren>
}>

const Overlay: FC<PropsWithChildren<VideoFeatures>> = ({
  children,
  ...features
}) => {
  const segment = useSelectedLayoutSegment() as keyof VideoFeatures

  const feature = features[segment]

  if (feature === undefined) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-l from-black/25 via-black/35 to-black/95">
      {feature({ children })}
    </div>
  )
}

export type { VideoFeatures }

export default Overlay
