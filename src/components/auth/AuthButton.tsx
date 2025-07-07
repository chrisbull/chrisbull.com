'use client'

import { Button, HStack } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Button loading>Loading...</Button>
  }

  if (session) {
    return (
      <HStack>
        <Button onClick={() => signOut()} variant="outline" size="sm">
          Sign Out
        </Button>
      </HStack>
    )
  }

  return (
    <Button onClick={() => signIn()} variant="outline">
      Sign In
    </Button>
  )
}
