'use client'

import {
  Button,
  Icon,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

interface SignInFormProps {
  providers: Record<LiteralUnion<string>, ClientSafeProvider> | null
}

export function SignInForm({ providers }: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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
        // Redirect to home page on successful login
        window.location.href = '/'
      }
    } catch {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return FaGithub
      case 'google':
        return FaGoogle
      default:
        return null
    }
  }

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return 'gray'
      case 'google':
        return 'red'
      default:
        return 'blue'
    }
  }

  const oauthProviders = providers
    ? Object.values(providers).filter(provider => provider.id !== 'credentials')
    : []

  return (
    <VStack gap={6} w="full">
      {/* Email/Password Form */}
      <form onSubmit={handleCredentialsSignIn} style={{ width: '100%' }}>
        <Stack gap={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && (
            <Text fontSize="sm" color="red.500" bg="red.50" p={2} rounded="md">
              {error}
            </Text>
          )}

          <Button type="submit" w="full" loading={isLoading}>
            Sign in with Email
          </Button>
        </Stack>
      </form>

      {/* Registration Link */}
      <Text fontSize="sm" color="gray.600">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" style={{ textDecoration: 'underline' }}>
          Sign up
        </Link>
      </Text>

      {/* OAuth Providers */}
      {oauthProviders.length > 0 && (
        <>
          <Separator />
          <VStack gap={4} w="full">
            <Text fontSize="sm" color="gray.600">
              Or continue with
            </Text>
            {oauthProviders.map(provider => {
              const IconComponent = getProviderIcon(provider.id)
              const colorScheme = getProviderColor(provider.id)

              return (
                <Button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  w="full"
                  colorScheme={colorScheme}
                  variant="outline"
                >
                  {IconComponent && <Icon as={IconComponent} me={2} />}
                  Sign in with {provider.name}
                </Button>
              )
            })}
          </VStack>
        </>
      )}
    </VStack>
  )
}
