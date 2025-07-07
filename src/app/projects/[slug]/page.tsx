import { getProjectBySlug } from '@/lib/actions/public'
import { HeaderSection } from '@/components/site/header.section'
import { FooterSection } from '@/components/site/footer.section'
import { notFound } from 'next/navigation'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuExternalLink } from 'react-icons/lu'
import NextLink from 'next/link'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const primaryImage = project.images?.[0]
  const placeholderImage = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=entropy&auto=format&q=80`

  return (
    <>
      <HeaderSection />

      <Container maxW="container.xl" py="8">
        <VStack gap="12" align="stretch">
          {/* Back Button */}
          <Box>
            <Link asChild>
              <NextLink href="/">
                <Button variant="ghost" size="sm">
                  ← Back to Projects
                </Button>
              </NextLink>
            </Link>
          </Box>

          {/* Hero Image */}
          <Box position="relative" overflow="hidden" rounded="xl">
            <Image
              src={primaryImage?.url || placeholderImage}
              alt={primaryImage?.alt || project.title}
              w="full"
              h={{ base: '300px', md: '500px' }}
              objectFit="cover"
            />
            {project.featured && (
              <Badge
                position="absolute"
                top="6"
                right="6"
                colorPalette="orange"
                size="md"
                px="3"
                py="2"
              >
                Featured Project
              </Badge>
            )}
          </Box>

          {/* Project Content */}
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="12">
            {/* Main Content */}
            <Stack gap="8" gridColumn={{ lg: 'span 2' }}>
              <Stack gap="4">
                <Heading size="3xl" lineHeight="tight">
                  {project.title}
                </Heading>
                {project.company && (
                  <Text fontSize="xl" color="fg.muted" fontWeight="medium">
                    {project.company}
                  </Text>
                )}
                <Text fontSize="lg" color="fg.muted">
                  {project.description}
                </Text>
              </Stack>

              <Stack gap="6">
                <Heading size="lg">About This Project</Heading>
                <Text
                  fontSize="md"
                  lineHeight="relaxed"
                  color="fg.muted"
                  whiteSpace="pre-wrap"
                >
                  {project.longDescription}
                </Text>
              </Stack>

              {/* Additional Images */}
              {project.images.length > 1 && (
                <Stack gap="6">
                  <Heading size="lg">Gallery</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    {project.images.slice(1).map(image => (
                      <Box key={image.id} overflow="hidden" rounded="lg">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          w="full"
                          h="250px"
                          objectFit="cover"
                        />
                        {image.caption && (
                          <Text fontSize="sm" color="fg.muted" mt="2">
                            {image.caption}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </SimpleGrid>
                </Stack>
              )}
            </Stack>

            {/* Sidebar */}
            <Stack gap="8">
              {/* Technologies */}
              <Stack gap="4">
                <Heading size="md">Technologies Used</Heading>
                <Flex wrap="wrap" gap="2">
                  {project.skills.map(projectSkill => (
                    <Badge
                      key={projectSkill.skill.id}
                      size="md"
                      px="3"
                      py="2"
                      style={{
                        backgroundColor: projectSkill.skill.color,
                        color: 'white',
                      }}
                    >
                      {projectSkill.skill.name}
                    </Badge>
                  ))}
                </Flex>
              </Stack>

              {/* Links */}
              <Stack gap="4">
                <Heading size="md">Links</Heading>
                <Stack gap="3">
                  {project.projectUrl && (
                    <Link
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" w="full">
                        <Flex align="center" gap="2">
                          View Live Project
                          <LuExternalLink />
                        </Flex>
                      </Button>
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" w="full">
                        <Flex align="center" gap="2">
                          View Source Code
                          <LuExternalLink />
                        </Flex>
                      </Button>
                    </Link>
                  )}
                </Stack>
              </Stack>

              {/* Author Info */}
              {project.author && (
                <Stack gap="4">
                  <Heading size="md">Created By</Heading>
                  <Text color="fg.muted">{project.author.name}</Text>
                </Stack>
              )}

              {/* Project Status */}
              <Stack gap="4">
                <Heading size="md">Status</Heading>
                <Badge
                  colorPalette="green"
                  size="md"
                  px="3"
                  py="2"
                  w="fit-content"
                >
                  Published
                </Badge>
              </Stack>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>

      <FooterSection />
    </>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}
