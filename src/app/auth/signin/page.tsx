import { Suspense } from 'react'
import { getProviders } from 'next-auth/react'
import { SignInForm } from '@/components/auth/SignInForm'
import { Container, Heading, VStack } from '@chakra-ui/react'

export default async function SignInPage() {
  const providers = await getProviders()

  return (
    <Container maxW="sm" py={10}>
      <VStack gap={6}>
        <Heading size="lg">Sign In</Heading>
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm providers={providers} />
        </Suspense>
      </VStack>
    </Container>
  )
}
