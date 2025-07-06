import { Button, VStack, Text, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <VStack gap={4} align="center" justify="center" minH="50vh" p={8}>
      <Heading size="lg" color="gray.600">
        404 - Page Not Found
      </Heading>
      <Text textAlign="center" color="gray.500">
        The page you&apos;re looking for doesn&apos;t exist.
      </Text>
      <Link href="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </VStack>
  )
}
