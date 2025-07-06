import { Text } from '@chakra-ui/react'
import { siteConfig } from '@/site.config'

export const Logo = () => {
  return <Text>{siteConfig.appName}</Text>
}
