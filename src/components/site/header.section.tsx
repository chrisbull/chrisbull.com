'use client'

import { Logo } from '@/components/logo'
import { SocialLinks } from '@/components/social-links'

import {
  Button,
  Container,
  Dialog,
  HStack,
  IconButton,
  Spacer,
  Stack,
  chakra,
} from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { siteConfig } from '../../../site.config'
import { ColorModeButton } from '@/components/ui/color-mode'

const HeaderRoot = chakra(Container, {
  base: {
    minH: '64px',
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    gap: { base: '1', md: '4' },
  },
})

const LogoLink = () => (
  <HStack asChild>
    <Link href="/">
      <Logo />
    </Link>
  </HStack>
)

const NAV_LINKS: { title: string; url: string }[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
]

const DesktopNav = () => (
  <HStack gap="2" as="nav" aria-label="primary navigation">
    <HStack gap="4" minH="48px" display={{ base: 'none', md: 'flex' }}>
      {NAV_LINKS.map(item => (
        <HStack
          asChild
          minH="8"
          px="3"
          rounded="md"
          fontWeight="medium"
          textStyle="sm"
          key={item.title}
        >
          <Link href={item.url}>{item.title}</Link>
        </HStack>
      ))}
      <SocialLinks
        items={[
          { type: 'github', href: siteConfig.githubUrl },
          { type: 'linkedIn', href: siteConfig.linkedInUrl },
        ]}
      />
    </HStack>
    <ColorModeButton />
  </HStack>
)

const MobileNavTrigger = () => (
  <Dialog.Trigger asChild>
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      aria-label="Open menu"
      fontSize="md"
      variant="ghost"
    >
      <AiOutlineMenu />
    </IconButton>
  </Dialog.Trigger>
)

const MobileNavCloseTrigger = () => (
  <Dialog.CloseTrigger asChild pos="inherit" inset="0">
    <IconButton
      aria-label="Close menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineClose />
    </IconButton>
  </Dialog.CloseTrigger>
)

const MobileNavContent = () => (
  <Container>
    <Stack py="4" gap="4">
      {NAV_LINKS.map(item => (
        <Button key={item.title} variant="outline" asChild>
          <Link href={item.url}>{item.title}</Link>
        </Button>
      ))}
    </Stack>
  </Container>
)

const MobileNav = () => {
  return (
    <Dialog.Root>
      <MobileNavTrigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content m="0" shadow="none" borderRadius="0" bg="bg">
          <HeaderRoot>
            <LogoLink />
            <Spacer />
            <MobileNavCloseTrigger />
          </HeaderRoot>
          <MobileNavContent />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const HeaderSection = () => {
  return (
    <Container mt="2">
      <HStack>
        <LogoLink />
        <Spacer />
        <DesktopNav />
        <MobileNav />
      </HStack>
    </Container>
  )
}
