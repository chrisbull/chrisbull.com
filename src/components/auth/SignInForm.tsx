'use client'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { Button, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Check if we're on the admin page to redirect appropriately
        const isAdminPage = window.location.pathname.startsWith('/admin')
        if (isAdminPage) {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      }
    } catch {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack gap={6} w="full">
      <form onSubmit={handleCredentialsSignIn} style={{ width: '100%' }}>
        <Stack gap={4}>
          <Field label="Email">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field label="Password">
            <PasswordInput
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Field>

          {error && (
            <Text fontSize="sm" color="red.500" bg="red.50" p={2} rounded="md">
              {error}
            </Text>
          )}

          <Button type="submit" w="full" loading={isLoading}>
            Sign in
          </Button>
        </Stack>
      </form>
    </VStack>
  )
}
