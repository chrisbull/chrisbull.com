import { Logo } from '@/components/logo'
import { siteConfig } from '@/site.config'
import {
  Box,
  Container,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const linkTree = [
  {
    title: 'Projects',
    items: [
      { label: '🧀 Chdr', href: 'https://chdr.app' },
      { label: '😆 ChaDoin', href: 'https://chadoin.co' },
      { label: '💎 Brndabl', href: 'https://brndabl.com' },
      { label: '☑️ NXLVL Agency', href: 'https://nxlvl.agency' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
    ],
  },
]

export const FooterSection = () => {
  return (
    <footer role="contentinfo">
      <Container py="5">
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align="flex-start"
          gap="8"
        >
          <Stack align="flex-start">
            <Logo />
            <HStack fontSize="2xl" gap={3} py={2}>
              <Link href="https://github.com/chrisbull" target="_blank">
                <FaGithub />
              </Link>
              <Link
                href="https://www.linkedin.com/in/chrislbull/"
                target="_blank"
              >
                <FaLinkedin />
              </Link>
            </HStack>
            <Text fontSize="xs" color="fg.muted">
              Project by Chris Bull
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              {siteConfig.copyright}
            </Text>
          </Stack>
          <SimpleGrid
            // width="full"
            gap="10"
            columns={{ base: 1, sm: 2 }}
            maxW={{ md: '2xl' }}
            pb="20"
          >
            {linkTree.map(column => (
              <Stack key={column.title} direction="column" gap="4">
                <Text>{column.title}</Text>
                {column.items.map(item => (
                  <Box key={item.label} asChild color="fg.muted">
                    <Link href={item.href}>{item.label}</Link>
                  </Box>
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </footer>
  )
}
