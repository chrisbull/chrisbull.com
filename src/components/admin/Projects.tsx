import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { Project, ProjectSkill, Skill } from '@/generated/prisma'

export type ProjectWithSkills = Project & {
  skills: (ProjectSkill & {
    skill: Skill
  })[]
}

export function Projects({ projects }: { projects: ProjectWithSkills[] }) {
  return (
    <Container maxW="container.xl" py="8">
      <Stack gap="8">
        <Flex justify="space-between" align="center">
          <Heading size="xl">Projects</Heading>
          <Link href="/admin/projects/new">
            <Button size="lg">Add New Project</Button>
          </Link>
        </Flex>

        {projects.length === 0 ? (
          <Card.Root>
            <Card.Body p="8" textAlign="center">
              <Text color="fg.muted" mb="4">
                No projects found. Create your first project to get started.
              </Text>
              <Link href="/admin/projects/new">
                <Button>Add New Project</Button>
              </Link>
            </Card.Body>
          </Card.Root>
        ) : (
          <Table.Root rounded="md">
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
                      <Link href={`/admin/projects/${project.id}`}>
                        <Text fontWeight="semibold">{project.title}</Text>
                      </Link>
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
                      {project.featured && <Badge size="sm">Featured</Badge>}
                      <Badge
                        colorPalette={project.published ? 'green' : 'gray'}
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
        )}
      </Stack>
    </Container>
  )
}
