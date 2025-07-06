import { Suspense } from 'react'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Container, Heading, VStack } from '@chakra-ui/react'

export default function RegisterPage() {
  return (
    <Container maxW="sm" py={10}>
      <VStack gap={6}>
        <Heading size="lg">Create Account</Heading>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </VStack>
    </Container>
  )
}
