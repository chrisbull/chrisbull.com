'use client'

import { getProviderColor, getProviderIcon } from '@/components/auth/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { PasswordInput } from '@/components/ui/password-input'
import {
  Button,
  Field,
  HStack,
  Icon,
  Input,
  Link,
  Separator,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from 'next-auth/react'
import { useState } from 'react'

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

  const oauthProviders = providers
    ? Object.values(providers).filter(provider => provider.id !== 'credentials')
    : []

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

          <HStack>
            <Checkbox>Remember Me</Checkbox>
            <Spacer />
            <Link
              fontSize="sm"
              href="/auth/forgot-password"
              fontWeight="semibold"
            >
              Forgot Password?
            </Link>
          </HStack>

          <Button type="submit" w="full" loading={isLoading}>
            Sign in
          </Button>
        </Stack>
      </form>

      {/* Registration Link */}
      <Text fontSize="sm" color="fg.muted">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/register"
          textDecoration="underline"
          fontWeight="semibold"
        >
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
              const colorPalette = getProviderColor(provider.id)

              return (
                <Button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  w="full"
                  colorPalette={colorPalette}
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
