'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Card,
  Heading,
  Input,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" bg="bg.subtle">
      <Container maxW="md">
        <Card.Root>
          <Card.Body p="8">
            <Stack gap="6">
              <Heading size="xl" textAlign="center">
                Admin Login
              </Heading>

              {error && (
                <Box
                  bg="red.50"
                  borderColor="red.200"
                  borderWidth="1px"
                  borderRadius="md"
                  p="3"
                >
                  <Text color="red.700" fontSize="sm">
                    {error}
                  </Text>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Box>
                    <Text mb="2" fontSize="sm" fontWeight="medium">
                      Email
                    </Text>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </Box>

                  <Box>
                    <Text mb="2" fontSize="sm" fontWeight="medium">
                      Password
                    </Text>
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </Box>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    loading={isLoading}
                    w="full"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  )
}
