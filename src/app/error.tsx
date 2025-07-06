'use client'

import { Button, VStack, Text, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <VStack gap={4} align="center" justify="center" minH="50vh" p={8}>
      <Heading size="lg" color="red.500">
        Something went wrong!
      </Heading>
      <Text textAlign="center" color="gray.600">
        We encountered an error while loading this page.
      </Text>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </VStack>
  )
}
