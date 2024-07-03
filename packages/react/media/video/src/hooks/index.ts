'use client'

import { useContext } from 'react'

import {
  VideoAudioContext,
  VideoQualityContext,
  VideoSubtitleContext,
} from '@/contexts'

import useVideo from './useVideo'
import useVideoVolume from './useVideoVolume'
import useVideoTimeline from './useVideoTimeline'

import { useVideoPip, useVideoFullscreen } from './useVideoDisplay'

const useVideoAudio = () => useContext(VideoAudioContext)
const useVideoQuality = () => useContext(VideoQualityContext)
const useVideoSubtitle = () => useContext(VideoSubtitleContext)

export {
  useVideo,
  useVideoPip,
  useVideoAudio,
  useVideoVolume,
  useVideoQuality,
  useVideoSubtitle,
  useVideoTimeline,
  useVideoFullscreen,
}
