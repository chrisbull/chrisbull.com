import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Project, ProjectSkill, Skill, ProjectImage } from '@/generated/prisma'
import NextLink from 'next/link'

export type ProjectWithDetails = Project & {
  skills: (ProjectSkill & {
    skill: Skill
  })[]
  images: ProjectImage[]
}

interface ProjectCardProps {
  project: ProjectWithDetails
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryImage = project.images?.[0]
  const placeholderImage = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80`

  return (
    <Card.Root
      overflow="hidden"
      bg="bg"
      shadow="lg"
      transition="all 0.2s"
      _hover={{
        shadow: 'xl',
        transform: 'translateY(-2px)',
      }}
      h="full"
    >
      <Link asChild>
        <NextLink href={`/projects/${project.slug}`}>
          <Box position="relative" overflow="hidden">
            <Image
              src={primaryImage?.url || placeholderImage}
              alt={primaryImage?.alt || project.title}
              w="full"
              h="240px"
              objectFit="cover"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
            />
            {project.featured && (
              <Badge
                position="absolute"
                top="4"
                right="4"
                colorPalette="orange"
                size="sm"
                px="2"
                py="1"
              >
                Featured
              </Badge>
            )}
          </Box>
        </NextLink>
      </Link>

      <Card.Body p="6">
        <Stack gap="4">
          <Stack gap="2">
            <Link asChild>
              <NextLink href={`/projects/${project.slug}`}>
                <Heading
                  size="lg"
                  lineHeight="tight"
                  color="fg"
                  _hover={{ color: 'colorPalette.500' }}
                  transition="color 0.2s"
                >
                  {project.title}
                </Heading>
              </NextLink>
            </Link>

            {project.company && (
              <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                {project.company}
              </Text>
            )}
          </Stack>

          <Text color="fg.muted" lineHeight="relaxed" lineClamp={3}>
            {project.description}
          </Text>

          <Flex wrap="wrap" gap="2">
            {project.skills.slice(0, 4).map(projectSkill => (
              <Badge
                key={projectSkill.skill.id}
                size="sm"
                style={{
                  backgroundColor: projectSkill.skill.color,
                  color: 'white',
                }}
              >
                {projectSkill.skill.name}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge size="sm" variant="outline">
                +{project.skills.length - 4} more
              </Badge>
            )}
          </Flex>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
