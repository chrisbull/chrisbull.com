import { Text } from '@chakra-ui/react'
import { siteConfig } from '@/site.config'

export const Logo = () => {
  return (
    <Text fontSize="2xl" fontWeight="bold">
      {siteConfig.appName}
    </Text>
  )
}
