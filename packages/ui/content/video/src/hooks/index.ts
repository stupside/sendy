'use client'

import { useContext } from 'react'

import {
  VideoAudioContext,
  VideoQualityContext,
  VideoSubtitleContext,
} from 'src/contexts'

import useVideo from './useVideo'

export * from './useVideoDisplay'

import useVideoVolume from './useVideoVolume'
import useVideoTimeline from './useVideoTimeline'

const useVideoAudio = () => useContext(VideoAudioContext)
const useVideoQuality = () => useContext(VideoQualityContext)
const useVideoSubtitle = () => useContext(VideoSubtitleContext)

export {
  useVideo,
  useVideoAudio,
  useVideoVolume,
  useVideoQuality,
  useVideoSubtitle,
  useVideoTimeline,
}
