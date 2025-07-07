import { Projects } from '@/components/admin/Projects'
import { AuthButton } from '@/components/auth/AuthButton'
import { ColorModeButton } from '@/components/ui/color-mode'
import { prisma } from '@/lib/prisma'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin')
  }

  const projects = await prisma.project.findMany({
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  })

  return (
    <Box minH="100vh">
      {/* Header */}
      <Box borderBottom="1px solid" borderColor="border">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py="4">
            <Heading size="lg">Admin Dashboard</Heading>
            <Flex gap="4" align="center">
              <ColorModeButton />
              <AuthButton />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Projects projects={projects} />
    </Box>
  )
}
