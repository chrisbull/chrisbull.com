import { HeaderSection } from '@/components/site/header.section'
import { HeroSection } from '@/components/site/hero.section'
import { FooterSection } from '@/components/site/footer.section'
import { Spacer, Stack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Stack minH="100vh" justify="space-between">
      <HeaderSection />
      <HeroSection />
      <Spacer />
      <FooterSection />
    </Stack>
  )
}
