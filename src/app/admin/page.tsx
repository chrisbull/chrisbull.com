'use client'

import { SignInForm } from '@/components/auth/SignInForm'
import { Box, Card, Container, Heading, Stack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLoginPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard')
    }
  }, [status, router])

  return (
    <Box minH="100vh" display="flex" alignItems="center" bg="bg.subtle">
      <Container maxW="md">
        <Card.Root>
          <Card.Body p="8">
            <Stack gap="6">
              <Heading size="xl" textAlign="center">
                Admin Login
              </Heading>

              <SignInForm />
            </Stack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  )
}
