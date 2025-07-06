'use client'

import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

export function HeroSection() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          gap={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color="fg.muted"
          >
            Welcome to my <br />
            <Text as={'span'} color="fg">
              awesome website!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            This is a website that I built to showcase my skills and projects.{' '}
            <br />
            It is built with Next.js, Chakra UI, and Prisma.
          </Text>
          <Stack
            direction={'column'}
            gap={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button size="lg" rounded="full">
              My Projects
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
