'use client'

import { useContext } from 'react'

import {
  VideoAudioContext,
  VideoQualityContext,
  VideoSubtitleContext,
} from '@/contexts'

export { default as useVideo } from './useVideo'
export { default as useVideoBuffer } from './useVideoBuffer'
export { useVideoFullscreen, useVideoPip } from './useVideoDisplay'
export { default as useVideoTimeline } from './useVideoTimeline'
export { default as useVideoVolume } from './useVideoVolume'

const useVideoAudio = () => useContext(VideoAudioContext)
const useVideoQuality = () => useContext(VideoQualityContext)
const useVideoSubtitle = () => useContext(VideoSubtitleContext)

export { useVideoAudio, useVideoQuality, useVideoSubtitle }
