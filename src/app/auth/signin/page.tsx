import { Suspense } from 'react'
import { SignInForm } from '@/components/auth/SignInForm'
import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { Logo } from '@/components/logo'

export default async function SignInPage() {
  return (
    <Container maxW="md" py={10}>
      <VStack gap={6}>
        <Logo />
        <Stack align="center">
          <Heading size="3xl">Welcome back!</Heading>
          <Text>Sign in to your account to continue</Text>
        </Stack>
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm />
        </Suspense>
      </VStack>
    </Container>
  )
}
