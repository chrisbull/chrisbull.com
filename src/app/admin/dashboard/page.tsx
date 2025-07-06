'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Button,
  Stack,
  Text,
  Table,
  Badge,
  Flex,
  Link,
  Card,
} from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

interface Project {
  id: string
  title: string
  description: string
  slug: string
  company: string | null
  featured: boolean
  published: boolean
  createdAt: string
  skills: Array<{
    skill: {
      id: string
      name: string
      category: string
      color: string
    }
  }>
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/admin'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="bg.subtle">
      {/* Header */}
      <Box bg="bg" borderBottom="1px solid" borderColor="border">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py="4">
            <Heading size="lg">Admin Dashboard</Heading>
            <Flex gap="4" align="center">
              <ColorModeButton />
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py="8">
        <Stack gap="8">
          <Flex justify="space-between" align="center">
            <Heading size="xl">Projects</Heading>
            <Button colorScheme="blue" size="lg">
              Add New Project
            </Button>
          </Flex>

          {projects.length === 0 ? (
            <Card.Root>
              <Card.Body p="8" textAlign="center">
                <Text color="fg.muted" mb="4">
                  No projects found. Create your first project to get started.
                </Text>
                <Button colorScheme="blue">Add New Project</Button>
              </Card.Body>
            </Card.Root>
          ) : (
            <Card.Root>
              <Card.Body p="0">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Project</Table.ColumnHeader>
                      <Table.ColumnHeader>Company</Table.ColumnHeader>
                      <Table.ColumnHeader>Skills</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {projects.map(project => (
                      <Table.Row key={project.id}>
                        <Table.Cell>
                          <Stack gap="1">
                            <Text fontWeight="semibold">{project.title}</Text>
                            <Text fontSize="sm" color="fg.muted">
                              {project.description}
                            </Text>
                          </Stack>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{project.company || 'Personal'}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Flex wrap="wrap" gap="1">
                            {project.skills.slice(0, 3).map(skill => (
                              <Badge
                                key={skill.skill.id}
                                size="sm"
                                style={{
                                  backgroundColor: skill.skill.color,
                                  color: 'white',
                                }}
                              >
                                {skill.skill.name}
                              </Badge>
                            ))}
                            {project.skills.length > 3 && (
                              <Badge size="sm">
                                +{project.skills.length - 3} more
                              </Badge>
                            )}
                          </Flex>
                        </Table.Cell>
                        <Table.Cell>
                          <Stack gap="1">
                            {project.featured && (
                              <Badge colorScheme="purple" size="sm">
                                Featured
                              </Badge>
                            )}
                            <Badge
                              colorScheme={project.published ? 'green' : 'gray'}
                              size="sm"
                            >
                              {project.published ? 'Published' : 'Draft'}
                            </Badge>
                          </Stack>
                        </Table.Cell>
                        <Table.Cell>
                          <Stack direction="row" gap="2">
                            <Link href={`/admin/projects/${project.id}`}>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </Link>
                            <Link href={`/projects/${project.slug}`}>
                              <Button size="sm" variant="ghost">
                                View
                              </Button>
                            </Link>
                          </Stack>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Card.Body>
            </Card.Root>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
