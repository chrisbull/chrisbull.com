interface NavItem {
  title: string
  url: string
  external?: boolean
  status?: string
  items?: NavItem[]
}

interface SiteConfig {
  appName: string
  url: string
  title: string
  titleTemplate: string
  description: string
  copyright: string
  navigation: NavItem[]
  githubUrl: string
}

const APP_NAME = 'AppName'

export const siteConfig: SiteConfig = {
  appName: APP_NAME,
  url: '',
  title: `${APP_NAME}`,
  titleTemplate: `%s | ${APP_NAME}`,
  description: '',
  copyright: `© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`,
  navigation: [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About',
      url: '/about',
    },
  ],
  githubUrl: 'https://github.com/',
}
