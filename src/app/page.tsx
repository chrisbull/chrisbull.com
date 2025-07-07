import { HeaderSection } from '@/components/site/header.section'
import { HeroSection } from '@/components/site/hero.section'
import { FooterSection } from '@/components/site/footer.section'
import { ProjectCard } from '@/components/ProjectCard'
import { getPublishedProjects } from '@/lib/actions/public'
import {
  Container,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'

export default async function Home() {
  const projects = await getPublishedProjects()

  return (
    <Stack minH="100vh">
      <HeaderSection />
      <HeroSection />

      {/* Projects Section */}
      <Container maxW="container.xl" py="20">
        <Stack gap="12">
          <Stack gap="4" textAlign="center">
            <Heading size="2xl" color="fg">
              Featured Projects
            </Heading>
            <Text fontSize="xl" color="fg.muted" maxW="2xl" mx="auto">
              Explore my latest work and projects. Each one represents a unique
              challenge and learning experience.
            </Text>
          </Stack>

          {projects.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8" w="full">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color="fg.muted" py="20">
              No projects found. Check back soon for updates!
            </Text>
          )}
        </Stack>
      </Container>

      <Spacer />
      <FooterSection />
    </Stack>
  )
}
