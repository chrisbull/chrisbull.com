'use client'

import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Outfit', sans-serif` },
        body: { value: `'Outfit', sans-serif` },
      },
    },
  },
})
