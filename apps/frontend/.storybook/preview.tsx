'use client'

import React from 'react'

import { Preview } from '@storybook/react'

import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#27272A',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="text-white">
          <Story />
        </div>
      )
    },
  ],
  tags: ['autodocs'],
}

export default preview
