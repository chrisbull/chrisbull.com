import { Suspense } from 'react'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { Logo } from '@/components/logo'
import { getProviders } from 'next-auth/react'

export default async function RegisterPage() {
  const providers = await getProviders()

  return (
    <Container maxW="md" py={10}>
      <VStack gap={6}>
        <Logo />
        <Stack align="center">
          <Heading size="3xl">Create Account</Heading>
          <Text>Create an account to get started</Text>
        </Stack>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm providers={providers} />
        </Suspense>
      </VStack>
    </Container>
  )
}
